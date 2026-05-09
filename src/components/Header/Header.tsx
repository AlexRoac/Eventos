import "./Header.css"

interface Props {
  proximosCount: number
  tema: "dark" | "light"
  onToggleTema: () => void
}

function Header({ proximosCount, tema, onToggleTema }: Props) {
  return (
    <header className="header">
      <div className="header-logo-wrap">
        <img
          className="header-logo"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/250px-FC_Barcelona_%28crest%29.svg.png"
          alt="Cruz Azul"
        />
      </div>
      <div className="header-texto">
        <span className="header-titulo">Barça</span>
        <span className="header-subtitulo">Gestor de Eventos</span>
      </div>

      <div className="header-right">
        <div className="header-pill">
          <span className="header-pill-dot" />
          <span className="header-pill-txt">
            {proximosCount} {proximosCount === 1 ? "próximo evento" : "próximos eventos"}
          </span>
        </div>

        <button
          className="theme-toggle"
          onClick={onToggleTema}
          title={tema === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          aria-label="Cambiar tema"
        >
          {tema === "dark" ? (
            /* Sol */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            /* Luna */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
