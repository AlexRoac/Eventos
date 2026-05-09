import { useState, useEffect } from "react"
import useEventos from "./hooks/useEventos"
import useFiltro from "./hooks/useFiltro"
import { EventoItem, AgregarEvento, EditarEvento, Header, NavBar } from "./components"
import "./App.css"

function App() {
  const { eventos, insertar, eliminar, editar } = useEventos()
  const { filtro, setFiltro, eventosFuturos, eventosPasados } = useFiltro(eventos)
  const [eventoEditando, setEventoEditando] = useState<any>(null)
  const [mostrarAgregar, setMostrarAgregar] = useState(false)
  const [tema, setTema] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("tema") as "dark" | "light") || "dark"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema === "light" ? "light" : "")
    localStorage.setItem("tema", tema)
  }, [tema])

  const toggleTema = () => setTema(t => t === "dark" ? "light" : "dark")

  return (
    <div className="app-layout">
      <Header
        proximosCount={eventosFuturos.length}
        tema={tema}
        onToggleTema={toggleTema}
      />
      <NavBar
        onAgregar={() => setMostrarAgregar(true)}
        filtro={filtro}
        onFiltro={setFiltro}
      />

      <main className="main-content">
        <div className="seccion-header">
          <span className="seccion-titulo">Próximos eventos</span>
          <span className="seccion-count">{eventosFuturos.length}</span>
          <span className="seccion-divider" />
        </div>

        {eventosFuturos.length === 0
          ? <p className="empty-state">No hay eventos próximos.</p>
          : eventosFuturos.map((evento: any) => (
            <EventoItem
              key={evento.id}
              {...evento}
              onEliminar={() => eliminar(evento.id)}
              onEditar={() => setEventoEditando(evento)}
            />
          ))
        }

        <div className="seccion-header">
          <span className="seccion-titulo">Eventos pasados</span>
          <span className="seccion-count pasado">{eventosPasados.length}</span>
          <span className="seccion-divider" />
        </div>

        {eventosPasados.length === 0
          ? <p className="empty-state">No hay eventos pasados.</p>
          : eventosPasados.map((evento: any) => (
            <EventoItem
              key={evento.id}
              {...evento}
              onEliminar={() => eliminar(evento.id)}
              onEditar={() => setEventoEditando(evento)}
            />
          ))
        }
      </main>

      {mostrarAgregar && (
        <AgregarEvento
          insertar={insertar}
          onCerrar={() => setMostrarAgregar(false)}
        />
      )}

      {eventoEditando && (
        <EditarEvento
          evento={eventoEditando}
          editar={editar}
          onCerrar={() => setEventoEditando(null)}
        />
      )}
    </div>
  )
}

export default App
