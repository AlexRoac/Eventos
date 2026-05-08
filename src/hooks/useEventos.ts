import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"

function useEventos() {
  const [eventos, setEventos] = useState<any[]>([])

  const traer = async () => {
    const { data } = await supabase.from("eventos").select("*")
    if (data) setEventos(data)
  }

  const insertar = async (nombre: string, lugar: string, fecha: string, precio: number, tipo: string) => {
    try {
      const { error } = await supabase.from("eventos").insert({ nombre, lugar, fecha, precio, tipo })
      if (error) console.error(error)
      await traer()
    } catch (error) {
      console.error(error)
    }
  }

  const eliminar = async (id: number) => {
    try {
      const { error } = await supabase.from("eventos").delete().eq("id", id)
      if (error) console.error(error)
      await traer()
    } catch (error) {
      console.error(error)
    }
  }

  const editar = async (id: number, nombre: string, lugar: string, fecha: string, precio: number, tipo: string) => {
    try {
      const { error } = await supabase.from("eventos").update({ nombre, lugar, fecha, precio, tipo }).eq("id", id)
      if (error) console.error(error)
      await traer()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { traer() }, [])

  return { eventos, insertar, eliminar, editar }
}

export default useEventos
