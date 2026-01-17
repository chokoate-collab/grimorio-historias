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
  readStories,
}) {

  favorites = Array.isArray(favorites) ? favorites : [];
  readStories = Array.isArray(readStories) ? readStories : [];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar historia..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {/* FILTRO CATEGORÍA */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        <option value="todas">Todas</option>
        <option value="Fantasmas">Fantasma</option>
        <option value="Criatura">Criatura</option>
        <option value="Dimensiones">Dimensiones</option>
        <option value="Psicologico">Psicologico</option>
        <option value="Internet">Internet</option>
        <option value="Espiritual">Espiritual</option>
        <option value="Objetos malditos">Objetos malditos</option>
        <option value="Paranormal">Paranormal</option>
        <option value="Gore">Gore</option>
      </select>

      {/* FAVORITOS */}
      <label style={{ display: "block", marginBottom: "20px", color: "white" }}>
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
          style={{ marginRight: "8px" }}
        />
        Mostrar solo favoritas ⭐
      </label>

      {/* LISTA */}
      {stories.map((story) => {

        const isRead = readStories.includes(story.id);

        return (
          <div
            key={story.id}
            className={`story-card ${isRead ? "read" : ""}`}
          >

            {/* Favorito */}
            <span
              onClick={() => onToggleFavorite(story.id)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                fontSize: "22px",
                cursor: "pointer",
                zIndex: 5
              }}
            >
              {favorites.includes(story.id) ? "★" : "☆"}
            </span>

            {/* Card */}
            <div onClick={() => onSelect(story.id)}>

              <h2>{story.title}</h2>

              <p className="story-category">
                {story.category.toUpperCase()}
              </p>

              {isRead && (
                <span className="read-check">
                  ✔ Leído
                </span>
              )}

            </div>

          </div>
        );
      })}

      {stories.length === 0 && (
        <p className="empty-message">
          No hay historias para mostrar
        </p>
      )}

    </div>
  );
}
