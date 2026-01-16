import { useState, useEffect, useRef } from "react";
import stories from "./stories.json";
import StoryList from "./StoryList";
import StoryReader from "./StoryReader";

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 🔊 Sonido
  const [soundOn, setSoundOn] = useState(() => {
    return localStorage.getItem("soundOn") === "true";
  });

  const audioRef = useRef(null);

  // ⭐ Favoritos
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Historias leídas
  const [readStories, setReadStories] = useState(() => {
    const saved = localStorage.getItem("readStories");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("readStories", JSON.stringify(readStories));
  }, [readStories]);

  useEffect(() => {
    localStorage.setItem("soundOn", soundOn);

    if (!audioRef.current) return;

    audioRef.current.volume = 0.25;

    if (soundOn) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [soundOn]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
    );
  };

  const activeStory = stories.find((s) => s.id === activeId);

  const filteredStories = stories.filter((story) => {
    const matchesName =
      story.title?.toLowerCase().includes(query.toLowerCase()) ?? false;

    const matchesCategory =
      category === "todas" || story.category === category;

    const matchesFavorites =
      !showFavoritesOnly || favorites.includes(story.id);

    return matchesName && matchesCategory && matchesFavorites;
  });

  return (
    <div className={activeStory ? "app reading-mode" : "app"}>
      <h1 className="book-title">Grimorio de Historias</h1>

      {/* 🎵 Audio ambiental */}
      <audio ref={audioRef} src="/audio/ambiente.mp3" loop />

      {!activeStory && (
        <button
          className="sound-toggle"
          onClick={() => setSoundOn(!soundOn)}
        >
          {soundOn ? "🔊 Sonido ON" : "🔇 Sonido OFF"}
        </button>
      )}

      {!activeStory ? (
        <StoryList
          stories={filteredStories}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          onSelect={(id) => {
            setActiveId(id);

            // Marcar como leída automáticamente
            if (!readStories.includes(id)) {
              setReadStories([...readStories, id]);
            }
          }}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          readStories={readStories}
        />
      ) : (
        <StoryReader story={activeStory} onBack={() => setActiveId(null)} />
      )}
    </div>
  );
}
