import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"

// Convierte un File a base64 data URL (funciona en Vercel y cualquier hosting)
export const imagenABase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Redimensionar antes de convertir para no sobrepasar límites de Supabase
    const img = new Image()
    const reader = new FileReader()
    reader.onload = (e) => {
      img.src = e.target?.result as string
    }
    img.onload = () => {
      const MAX = 800 // máximo 800px de ancho/alto
      let w = img.width
      let h = img.height
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round((h * MAX) / w); w = MAX }
        else { w = Math.round((w * MAX) / h); h = MAX }
      }
      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL("image/jpeg", 0.82))
    }
    img.onerror = reject
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

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

  useEffect(() => { traer() }, [])

  return { eventos, insertar, eliminar, editar }
}

export default useEventos
