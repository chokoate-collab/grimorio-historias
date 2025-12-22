export default function StoryReader({ story, onBack }) {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        background: "#f6f0e3",
        padding: "25px",
        borderRadius: "10px",
        border: "2px solid #9c8b6a",
      }}
    >
      <h2 style={{ fontSize: "32px" }}>{story.title}</h2>

      <p style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}>
        {story.content}
      </p>

      <button
        onClick={onBack}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#9c8b6a",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Volver
      </button>
    </div>
  );
}
