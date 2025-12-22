export default function StoryList({
  stories,
  query,
  setQuery,
  category,
  setCategory,
  onSelect,
  favorites,
  onToggleFavorite,
  showFavoritesOnly,
  setShowFavoritesOnly,
}) {
  favorites = Array.isArray(favorites) ? favorites : [];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar historia..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* FILTRO DE CATEGORÍA */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        <option value="todas">Todas</option>
        <option value="fantasma">Fantasma</option>
        <option value="criatura">Criatura</option>
        <option value="casa">Casa</option>
      </select>

      {/* FILTRO FAVORITOS */}
      <label style={{ display: "block", marginBottom: "20px" }}>
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={() =>
            setShowFavoritesOnly(!showFavoritesOnly)
          }
          style={{ marginRight: "8px" }}
        />
        Mostrar solo favoritas ⭐
      </label>

      {/* LISTA */}
      {stories.map((story) => (
        <div
          key={story.id}
          style={{
            background: "#f6f0e3",
            border: "2px solid #9c8b6a",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <span
            onClick={() => onToggleFavorite(story.id)}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            {favorites.includes(story.id) ? "★" : "☆"}
          </span>

          <div onClick={() => onSelect(story.id)}>
            <h2 style={{ margin: 0 }}>{story.title}</h2>
            <p style={{ opacity: 0.6 }}>
              {story.category.toUpperCase()}
            </p>
          </div>
        </div>
      ))}

      {stories.length === 0 && (
        <p style={{ textAlign: "center", opacity: 0.6 }}>
          No hay historias para mostrar
        </p>
      )}
    </div>
  );
}
