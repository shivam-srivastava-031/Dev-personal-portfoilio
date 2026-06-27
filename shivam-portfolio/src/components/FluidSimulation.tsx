import { useEffect, useRef } from 'react';

// WebGL stable-fluids simulation that reacts to mouse / touch movement.
// Colors are pulled from the portfolio palette (teal, gold, lavender, cyan, amber).

const FluidSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;

    /* ── Canvas pixel sizing ────────────────────────────────────── */
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth || window.innerWidth;
      canvas.height = canvas.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    /* ── WebGL context ──────────────────────────────────────────── */
    const gl = canvas.getContext('webgl', {
      alpha: true, depth: false, stencil: false,
      antialias: false, preserveDrawingBuffer: false,
    }) as WebGLRenderingContext | null;
    if (!gl) { window.removeEventListener('resize', resizeCanvas); return; }

    /* ── Texture type (half-float → float → ubyte fallback) ─────── */
    let texType: number = gl.UNSIGNED_BYTE;
    let linearFilter: number = gl.NEAREST;

    const hfExt  = gl.getExtension('OES_texture_half_float');
    const hflExt = gl.getExtension('OES_texture_half_float_linear');
    const hfcExt = gl.getExtension('EXT_color_buffer_half_float');
    if (hfExt && hfcExt) {
      texType     = hfExt.HALF_FLOAT_OES;
      linearFilter = hflExt ? gl.LINEAR : gl.NEAREST;
    } else {
      const fExt  = gl.getExtension('OES_texture_float');
      const fcExt = gl.getExtension('WEBGL_color_buffer_float');
      const flExt = gl.getExtension('OES_texture_float_linear');
      if (fExt && fcExt) {
        texType      = gl.FLOAT;
        linearFilter = flExt ? gl.LINEAR : gl.NEAREST;
      }
    }

    /* ── Config ─────────────────────────────────────────────────── */
    const SIM_RES             = 128;
    const DYE_RES             = 512;
    const DENSITY_DISSIPATION = 3.0;
    const VELOCITY_DISSIPATION = 2.0;
    const PRESSURE_DECAY      = 0.8;
    const PRESSURE_ITERS      = 20;
    const CURL                = 30;
    const SPLAT_RADIUS        = 0.005;
    const SPLAT_FORCE         = 8000;

    const PALETTE = [
      { r: 0.0,  g: 0.83, b: 0.67 }, // teal #00D4AA
      { r: 1.0,  g: 0.84, b: 0.0  }, // gold #FFD700
      { r: 0.48, g: 0.37, b: 0.65 }, // lavender
      { r: 0.0,  g: 0.65, b: 0.90 }, // cyan-blue
      { r: 0.90, g: 0.45, b: 0.0  }, // amber
    ];

    /* ── Shader sources ─────────────────────────────────────────── */
    const VS = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL; varying vec2 vR;
      varying vec2 vT; varying vec2 vB;
      uniform vec2 texelSize;
      void main(){
        vUv=aPosition*.5+.5;
        vL=vUv-vec2(texelSize.x,0.);
        vR=vUv+vec2(texelSize.x,0.);
        vT=vUv+vec2(0.,texelSize.y);
        vB=vUv-vec2(0.,texelSize.y);
        gl_Position=vec4(aPosition,0.,1.);
      }`;

    const CLEAR_FS = `
      precision mediump float;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main(){ gl_FragColor=value*texture2D(uTexture,vUv); }`;

    const SPLAT_FS = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main(){
        vec2 p=vUv-point;
        p.x*=aspectRatio;
        vec3 splat=exp(-dot(p,p)/radius)*color;
        vec3 base=texture2D(uTarget,vUv).xyz;
        gl_FragColor=vec4(base+splat,1.);
      }`;

    const ADVECTION_FS = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;
      vec4 bilerp(sampler2D s,vec2 uv,vec2 ts){
        vec2 st=uv/ts-.5;
        vec2 i=floor(st),f=fract(st);
        vec4 a=texture2D(s,(i+vec2(.5,.5))*ts);
        vec4 b=texture2D(s,(i+vec2(1.5,.5))*ts);
        vec4 c=texture2D(s,(i+vec2(.5,1.5))*ts);
        vec4 d=texture2D(s,(i+vec2(1.5,1.5))*ts);
        return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
      }
      void main(){
        vec2 coord=vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize;
        vec4 res=bilerp(uSource,coord,dyeTexelSize);
        gl_FragColor=res/(1.+dissipation*dt);
      }`;

    const DIVERGENCE_FS = `
      precision mediump float;
      varying highp vec2 vUv;
      varying highp vec2 vL;varying highp vec2 vR;
      varying highp vec2 vT;varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main(){
        float L=texture2D(uVelocity,vL).x;
        float R=texture2D(uVelocity,vR).x;
        float T=texture2D(uVelocity,vT).y;
        float B=texture2D(uVelocity,vB).y;
        vec2 C=texture2D(uVelocity,vUv).xy;
        if(vL.x<0.)L=-C.x;
        if(vR.x>1.)R=-C.x;
        if(vT.y>1.)T=-C.y;
        if(vB.y<0.)B=-C.y;
        gl_FragColor=vec4(.5*(R-L+T-B),0.,0.,1.);
      }`;

    const CURL_FS = `
      precision mediump float;
      varying highp vec2 vUv;
      varying highp vec2 vL;varying highp vec2 vR;
      varying highp vec2 vT;varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main(){
        float L=texture2D(uVelocity,vL).y;
        float R=texture2D(uVelocity,vR).y;
        float T=texture2D(uVelocity,vT).x;
        float B=texture2D(uVelocity,vB).x;
        gl_FragColor=vec4(.5*(R-L-T+B),0.,0.,1.);
      }`;

    const VORTICITY_FS = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;varying vec2 vR;
      varying vec2 vT;varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main(){
        float L=texture2D(uCurl,vL).x;
        float R=texture2D(uCurl,vR).x;
        float T=texture2D(uCurl,vT).x;
        float B=texture2D(uCurl,vB).x;
        float C=texture2D(uCurl,vUv).x;
        vec2 f=.5*vec2(abs(T)-abs(B),abs(R)-abs(L));
        f/=length(f)+.0001;
        f*=curl*C;
        f.y*=-1.;
        vec2 v=texture2D(uVelocity,vUv).xy+f*dt;
        gl_FragColor=vec4(clamp(v,-1000.,1000.),0.,1.);
      }`;

    const PRESSURE_FS = `
      precision mediump float;
      varying highp vec2 vUv;
      varying highp vec2 vL;varying highp vec2 vR;
      varying highp vec2 vT;varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main(){
        float L=texture2D(uPressure,vL).x;
        float R=texture2D(uPressure,vR).x;
        float T=texture2D(uPressure,vT).x;
        float B=texture2D(uPressure,vB).x;
        float d=texture2D(uDivergence,vUv).x;
        gl_FragColor=vec4((L+R+B+T-d)*.25,0.,0.,1.);
      }`;

    const GRADIENT_FS = `
      precision mediump float;
      varying highp vec2 vUv;
      varying highp vec2 vL;varying highp vec2 vR;
      varying highp vec2 vT;varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main(){
        float L=texture2D(uPressure,vL).x;
        float R=texture2D(uPressure,vR).x;
        float T=texture2D(uPressure,vT).x;
        float B=texture2D(uPressure,vB).x;
        vec2 v=texture2D(uVelocity,vUv).xy-vec2(R-L,T-B);
        gl_FragColor=vec4(v,0.,1.);
      }`;

    const DISPLAY_FS = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uAlpha;
      void main(){
        vec3 C=texture2D(uTexture,vUv).rgb;
        float a=max(C.r,max(C.g,C.b));
        gl_FragColor=vec4(C*1.3,a*uAlpha);
      }`;

    /* ── Program compilation ────────────────────────────────────── */
    type Uniforms = Record<string, WebGLUniformLocation | null>;
    type Prog = { prog: WebGLProgram; uniforms: Uniforms };

    function mkProg(fs: string): Prog {
      const vs = gl!.createShader(gl!.VERTEX_SHADER)!;
      gl!.shaderSource(vs, VS); gl!.compileShader(vs);
      const fsh = gl!.createShader(gl!.FRAGMENT_SHADER)!;
      gl!.shaderSource(fsh, fs); gl!.compileShader(fsh);
      const prog = gl!.createProgram()!;
      gl!.attachShader(prog, vs); gl!.attachShader(prog, fsh);
      gl!.linkProgram(prog);
      const uniforms: Uniforms = {};
      const n = gl!.getProgramParameter(prog, gl!.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < n; i++) {
        const info = gl!.getActiveUniform(prog, i)!;
        uniforms[info.name] = gl!.getUniformLocation(prog, info.name);
      }
      return { prog, uniforms };
    }

    const clearProg     = mkProg(CLEAR_FS);
    const splatProg     = mkProg(SPLAT_FS);
    const advProg       = mkProg(ADVECTION_FS);
    const divProg       = mkProg(DIVERGENCE_FS);
    const curlProg      = mkProg(CURL_FS);
    const vortProg      = mkProg(VORTICITY_FS);
    const presProg      = mkProg(PRESSURE_FS);
    const gradProg      = mkProg(GRADIENT_FS);
    const displayProg   = mkProg(DISPLAY_FS);

    /* ── Full-screen quad ───────────────────────────────────────── */
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);

    /* ── FBO helpers ────────────────────────────────────────────── */
    type FBO = { tex: WebGLTexture; fb: WebGLFramebuffer; w: number; h: number;
                 attach(unit: number): number };
    type DFBO = { read: FBO; write: FBO; swap(): void; w: number; h: number };

    function mkFBO(w: number, h: number, filter: number): FBO {
      gl!.activeTexture(gl!.TEXTURE0);
      const tex = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, w, h, 0, gl!.RGBA, texType, null);
      const fb = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fb);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      return {
        tex, fb, w, h,
        attach(unit) { gl!.activeTexture(gl!.TEXTURE0 + unit); gl!.bindTexture(gl!.TEXTURE_2D, tex); return unit; },
      };
    }

    function mkDFBO(w: number, h: number, filter: number): DFBO {
      let a = mkFBO(w, h, filter), b = mkFBO(w, h, filter);
      return { get read(){ return a; }, get write(){ return b; }, swap(){ [a,b]=[b,a]; }, w, h };
    }

    const ar   = canvas.width / canvas.height;
    const simW = Math.round(SIM_RES * Math.max(1, ar));
    const simH = Math.round(SIM_RES / Math.max(1, ar) * Math.max(1, ar));
    const dyeW = Math.round(DYE_RES * Math.max(1, ar));
    const dyeH = Math.round(DYE_RES / Math.max(1, ar) * Math.max(1, ar));

    const velocity    = mkDFBO(simW, simH, linearFilter);
    const dye         = mkDFBO(dyeW, dyeH, linearFilter);
    const divFBO      = mkFBO(simW, simH, gl.NEAREST);
    const curlFBO     = mkFBO(simW, simH, gl.NEAREST);
    const pressure    = mkDFBO(simW, simH, gl.NEAREST);

    /* ── Draw helpers ───────────────────────────────────────────── */
    function use(p: Prog): Uniforms {
      gl!.useProgram(p.prog);
      const loc = gl!.getAttribLocation(p.prog, 'aPosition');
      gl!.enableVertexAttribArray(loc);
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0);
      return p.uniforms;
    }

    function blit(target: FBO | null) {
      if (target) {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fb);
        gl!.viewport(0, 0, target.w, target.h);
      } else {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        gl!.viewport(0, 0, canvas.width, canvas.height);
      }
      gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0);
    }

    /* ── Simulation step ────────────────────────────────────────── */
    function step(dt: number) {
      gl!.disable(gl!.BLEND);

      // Curl
      let u = use(curlProg);
      gl!.uniform2f(u.texelSize, 1/simW, 1/simH);
      gl!.uniform1i(u.uVelocity, velocity.read.attach(0));
      blit(curlFBO);

      // Vorticity confinement
      u = use(vortProg);
      gl!.uniform2f(u.texelSize, 1/simW, 1/simH);
      gl!.uniform1i(u.uVelocity, velocity.read.attach(0));
      gl!.uniform1i(u.uCurl, curlFBO.attach(1));
      gl!.uniform1f(u.curl, CURL);
      gl!.uniform1f(u.dt, dt);
      blit(velocity.write); velocity.swap();

      // Divergence
      u = use(divProg);
      gl!.uniform2f(u.texelSize, 1/simW, 1/simH);
      gl!.uniform1i(u.uVelocity, velocity.read.attach(0));
      blit(divFBO);

      // Clear pressure
      u = use(clearProg);
      gl!.uniform1i(u.uTexture, pressure.read.attach(0));
      gl!.uniform1f(u.value, PRESSURE_DECAY);
      blit(pressure.write); pressure.swap();

      // Pressure iterations (Jacobi)
      u = use(presProg);
      gl!.uniform2f(u.texelSize, 1/simW, 1/simH);
      gl!.uniform1i(u.uDivergence, divFBO.attach(1));
      for (let i = 0; i < PRESSURE_ITERS; i++) {
        gl!.uniform1i(u.uPressure, pressure.read.attach(0));
        blit(pressure.write); pressure.swap();
      }

      // Gradient subtract (project to divergence-free)
      u = use(gradProg);
      gl!.uniform2f(u.texelSize, 1/simW, 1/simH);
      gl!.uniform1i(u.uPressure, pressure.read.attach(0));
      gl!.uniform1i(u.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();

      // Advect velocity (self-advection)
      u = use(advProg);
      gl!.uniform2f(u.texelSize, 1/simW, 1/simH);
      gl!.uniform2f(u.dyeTexelSize, 1/simW, 1/simH);
      gl!.uniform1i(u.uVelocity, velocity.read.attach(0));
      gl!.uniform1i(u.uSource, velocity.read.attach(0));
      gl!.uniform1f(u.dt, dt);
      gl!.uniform1f(u.dissipation, VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();

      // Advect dye
      u = use(advProg);
      gl!.uniform2f(u.texelSize, 1/simW, 1/simH);
      gl!.uniform2f(u.dyeTexelSize, 1/dyeW, 1/dyeH);
      gl!.uniform1i(u.uVelocity, velocity.read.attach(0));
      gl!.uniform1i(u.uSource, dye.read.attach(1));
      gl!.uniform1f(u.dt, dt);
      gl!.uniform1f(u.dissipation, DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    }

    /* ── Splat input ────────────────────────────────────────────── */
    function splat(x: number, y: number, dx: number, dy: number, col: {r:number;g:number;b:number}) {
      const aspect = canvas.width / canvas.height;
      gl!.disable(gl!.BLEND);

      let u = use(splatProg);
      gl!.uniform1i(u.uTarget, velocity.read.attach(0));
      gl!.uniform1f(u.aspectRatio, aspect);
      gl!.uniform2f(u.point, x, y);
      gl!.uniform3f(u.color, dx, dy, 0);
      gl!.uniform1f(u.radius, SPLAT_RADIUS);
      blit(velocity.write); velocity.swap();

      u = use(splatProg);
      gl!.uniform1i(u.uTarget, dye.read.attach(0));
      gl!.uniform1f(u.aspectRatio, aspect);
      gl!.uniform2f(u.point, x, y);
      gl!.uniform3f(u.color, col.r, col.g, col.b);
      gl!.uniform1f(u.radius, SPLAT_RADIUS);
      blit(dye.write); dye.swap();
    }

    /* ── Render to screen ───────────────────────────────────────── */
    function render() {
      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      const u = use(displayProg);
      gl!.uniform2f(u.texelSize, 1/canvas.width, 1/canvas.height);
      gl!.uniform1i(u.uTexture, dye.read.attach(0));
      gl!.uniform1f(u.uAlpha, 0.82);
      blit(null);
    }

    /* ── Mouse / touch input ────────────────────────────────────── */
    let mx = 0.5, my = 0.5, mdx = 0, mdy = 0, moved = false;
    let colorIdx = 0, colorTimer = 0;

    const onMove = (cx: number, cy: number) => {
      const nx = cx / canvas.clientWidth;
      const ny = 1 - cy / canvas.clientHeight;
      mdx = (nx - mx) * SPLAT_FORCE;
      mdy = (ny - my) * SPLAT_FORCE;
      mx = nx; my = ny; moved = true;
    };

    const onMouseMove = (e: MouseEvent)  => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent)  => { e.preventDefault(); onMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY); };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    /* ── Animation loop ─────────────────────────────────────────── */
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) * 0.001, 0.016667);
      lastTime = now;

      colorTimer += dt;
      if (colorTimer > 1.5) { colorTimer = 0; colorIdx = (colorIdx + 1) % PALETTE.length; }

      if (moved) {
        splat(mx, my, mdx, mdy, PALETTE[colorIdx]);
        moved = false;
      }

      step(dt);
      render();
      animId = requestAnimationFrame(loop);
    };

    // Seed a few initial splats so it isn't blank on load
    for (let i = 0; i < 6; i++) {
      splat(
        Math.random(), Math.random(),
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 600,
        PALETTE[i % PALETTE.length],
      );
    }

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default FluidSimulation;
