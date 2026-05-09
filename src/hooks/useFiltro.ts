import { useState, useMemo } from "react"

function getHoyStr() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm   = String(d.getMonth() + 1).padStart(2, "0")
  const dd   = String(d.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

function useFiltro(eventos: any[]) {
  const [filtro, setFiltro] = useState("Todos")

  const filtrados = useMemo(() => {
    return filtro === "Todos" ? eventos : eventos.filter(e => e.tipo === filtro)
  }, [eventos, filtro])

  const eventosHoy = useMemo(() => {
    const hoy = getHoyStr()
    return filtrados
      .filter(e => e.fecha === hoy)
      .sort((a, b) => a.fecha.localeCompare(b.fecha))
  }, [filtrados])

  const eventosFuturos = useMemo(() => {
    const hoy = getHoyStr()
    return filtrados
      .filter(e => e.fecha > hoy)
      .sort((a, b) => a.fecha.localeCompare(b.fecha))
  }, [filtrados])

  const eventosPasados = useMemo(() => {
    const hoy = getHoyStr()
    return filtrados
      .filter(e => e.fecha < hoy)
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
  }, [filtrados])

  return { filtro, setFiltro, eventosHoy, eventosFuturos, eventosPasados }
}

export default useFiltro
