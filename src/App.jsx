import { useState, useEffect } from "react";
import stories from "./stories.json";
import StoryList from "./StoryList";
import StoryReader from "./StoryReader";

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
    );
  };

  const activeStory = stories.find((s) => s.id === activeId);

  const filteredStories = stories.filter((story) => {
    const matchesName = story.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory =
      category === "todas" || story.category === category;

    const matchesFavorites =
      !showFavoritesOnly || favorites.includes(story.id);

    return matchesName && matchesCategory && matchesFavorites;
  });

  return (
    <div className="app">
      <h1 className="book-title">Grimorio de Historias</h1>

      {!activeStory ? (
        <StoryList
          stories={filteredStories}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          onSelect={setActiveId}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
        />
      ) : (
        <StoryReader
          story={activeStory}
          onBack={() => setActiveId(null)}
        />
      )}
    </div>
  );
}
