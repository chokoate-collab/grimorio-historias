import { useEffect } from "react";

export default function StoryReader({ story, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="story-container">
      <h2>{story.title}</h2>

      {story.category && (
        <div className="story-category">
          {story.category}
        </div>
      )}

      <p className="story-text">{story.content}</p>

      <button className="back-button" onClick={onBack}>
        Volver
      </button>
    </div>
  );
}
