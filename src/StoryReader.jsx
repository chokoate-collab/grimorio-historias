import { useEffect } from "react";
import AdBanner from "./AdBanner";

export default function StoryReader({ story, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [story.id]);

  return (
    <div className="story-container">
      <h2>{story.title}</h2>

      {story.category && (
        <div className="story-category">
          {story.category}
        </div>
      )}

      <p className="story-text">{story.content}</p>
      <AdBanner /><button className="back-button"></button>
      <button className="back-button" onClick={onBack}>
        Volver
      </button>
    </div>
  );
}
