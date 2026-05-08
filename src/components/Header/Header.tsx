import "./Header.css"

interface Props {
  proximosCount: number
}

function Header({ proximosCount }: Props) {
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
      <div className="header-pill">
        <span className="header-pill-dot" />
        <span className="header-pill-txt">
          {proximosCount} {proximosCount === 1 ? "próximo evento" : "próximos eventos"}
        </span>
      </div>
    </header>
  )
}

export default Header
