import { useState, useMemo } from "react"

function useFiltro(eventos: any[]) {
  const [filtro, setFiltro] = useState("Todos")
  const hoy = new Date()

  const filtrados = useMemo(() => {
    return filtro === "Todos" ? eventos : eventos.filter(e => e.tipo === filtro)
  }, [eventos, filtro])

  const eventosFuturos = useMemo(() => {
    return filtrados
      .filter(e => new Date(e.fecha) >= hoy)
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
  }, [filtrados])

  const eventosPasados = useMemo(() => {
    return filtrados
      .filter(e => new Date(e.fecha) < hoy)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  }, [filtrados])

  return { filtro, setFiltro, eventosFuturos, eventosPasados }
}

export default useFiltro
