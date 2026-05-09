import "./NavBar.css"

interface Props {
  onAgregar: () => void
  filtro: string
  onFiltro: (filtro: string) => void
}

const FILTROS = [
  { valor: "Todos",      label: "Todos" },
  { valor: "Deportes",   label: "🏅 Deportes" },
  { valor: "Social",     label: "🎉 Social" },
  { valor: "Cientifico", label: "🔬 Científico" },
  { valor: "Negocios",   label: "💼 Negocios" },
  { valor: "Politico",   label: "🏛️ Político" },
]

function NavBar({ onAgregar, filtro, onFiltro }: Props) {
  return (
    <nav className="navbar">
      <div className="navbar-filtros">
        {FILTROS.map(f => (
          <button
            key={f.valor}
            className={`navbar-btn ${filtro === f.valor ? "navbar-btn-activo" : ""}`}
            onClick={() => onFiltro(f.valor)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button className="navbar-btn-nuevo" onClick={onAgregar}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Nuevo evento
      </button>
    </nav>
  )
}

export default NavBar
