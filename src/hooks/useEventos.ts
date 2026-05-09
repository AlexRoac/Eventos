import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"

function useEventos() {
  const [eventos, setEventos] = useState<any[]>([])

  const traer = async () => {
    const { data } = await supabase.from("eventos").select("*")
    if (data) setEventos(data)
  }

  const insertar = async (
    nombre: string,
    lugar: string,
    fecha: string,
    precio: number,
    tipo: string,
    imagen_url?: string
  ) => {
    try {
      const { error } = await supabase
        .from("eventos")
        .insert({ nombre, lugar, fecha, precio, tipo, imagen_url: imagen_url || null })
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

  const editar = async (
    id: number,
    nombre: string,
    lugar: string,
    fecha: string,
    precio: number,
    tipo: string,
    imagen_url?: string
  ) => {
    try {
      const { error } = await supabase
        .from("eventos")
        .update({ nombre, lugar, fecha, precio, tipo, imagen_url: imagen_url ?? null })
        .eq("id", id)
      if (error) console.error(error)
      await traer()
    } catch (error) {
      console.error(error)
    }
  }

  const subirImagen = async (file: File, eventoId: number | string): Promise<string | null> => {
    try {
      const ext = file.name.split(".").pop()
      const path = `eventos/${eventoId}-${Date.now()}.${ext}`
      const { error } = await supabase.storage
        .from("eventos-imagenes")
        .upload(path, file, { upsert: true })
      if (error) {
        console.error("Error subiendo imagen:", error)
        return null
      }
      const { data } = supabase.storage.from("eventos-imagenes").getPublicUrl(path)
      return data.publicUrl
    } catch (err) {
      console.error(err)
      return null
    }
  }

  useEffect(() => { traer() }, [])

  return { eventos, insertar, eliminar, editar, subirImagen }
}

export default useEventos
