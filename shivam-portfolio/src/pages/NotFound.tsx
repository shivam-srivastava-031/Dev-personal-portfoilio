import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "@/components/story/story.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="story flex items-center px-5 sm:px-8 lg:pl-40">
      <div>
        <p className="mono text-[var(--ember)] mb-6">Error 404 · Missing page</p>
        <h1 className="display text-[clamp(3rem,10vw,8rem)] mb-8">
          This page was
          <br />
          never <em>written.</em>
        </h1>
        <a href="/" className="mono text-[var(--paper)] link-line">
          ← Back to the story
        </a>
      </div>
    </main>
  );
};

export default NotFound;
