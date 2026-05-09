import { useState, useRef } from "react"
import "../modal.css"
import Swal from "sweetalert2"
import { imagenABase64 } from "../../hooks/useEventos"

interface Props {
  evento: {
    id: number
    nombre: string
    lugar: string
    fecha: string
    precio: number
    tipo: string
    imagen_url?: string | null
  }
  editar: (id: number, nombre: string, lugar: string, fecha: string, precio: number, tipo: string, imagen_url?: string) => void
  onCerrar: () => void
}

function EditarEvento({ evento, editar, onCerrar }: Props) {
  const [nombre, setNombre]   = useState(evento.nombre)
  const [lugar, setLugar]     = useState(evento.lugar)
  const [fecha, setFecha]     = useState(evento.fecha)
  const [precio, setPrecio]   = useState(String(evento.precio))
  const [tipo, setTipo]       = useState(evento.tipo)
  const [error, setError]     = useState("")
  const [imagen, setImagen]   = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(evento.imagen_url || null)
  const [guardando, setGuardando] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImagen(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith("image/")) return
    setImagen(file)
    setPreview(URL.createObjectURL(file))
  }

  const manejarSubmit = () => {
    if (!nombre.trim() || !lugar.trim() || !fecha || !tipo) {
      setError("Todos los campos son obligatorios.")
      return
    }

    Swal.fire({
      title: "¿Guardar cambios?",
      icon: "question",
      background: "#12151c",
      color: "#e8eaf0",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1a56ff",
      cancelButtonColor: "#1a1e29",
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        setGuardando(true)
        let imagen_url: string | undefined
        if (imagen) {
          // Nueva imagen seleccionada → convertir a base64
          imagen_url = await imagenABase64(imagen)
        } else {
          // Mantener la existente (puede ser base64 o null si se quitó)
          imagen_url = preview ?? undefined
        }
        editar(evento.id, nombre.trim(), lugar.trim(), fecha, Number(precio || 0), tipo, imagen_url)
        setGuardando(false)
        onCerrar()
      }
    })
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCerrar()}>
      <div className="modal-box">
        <div className="modal-header">
          <p className="modal-titulo">Editar evento</p>
          <p className="modal-subtitulo">Modifica los datos del evento seleccionado.</p>
        </div>

        {error && <p className="modal-error">{error}</p>}

        {/* ── Imagen ── */}
        <div className="form-group">
          <label className="form-label">Imagen del evento (opcional)</label>
          <div
            className={`img-drop-zone ${preview ? "img-drop-zone--has-img" : ""}`}
            onClick={() => fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            {preview ? (
              <>
                <img src={preview} alt="preview" className="img-preview" />
                <div className="img-drop-overlay"><span>Cambiar imagen</span></div>
              </>
            ) : (
              <div className="img-drop-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Arrastra una imagen o haz clic para seleccionar</span>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
          {preview && (
            <button className="btn-quitar-imagen" onClick={() => { setPreview(null); setImagen(null) }}>
              Quitar imagen
            </button>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Nombre del evento</label>
          <input className="form-input" type="text" value={nombre} onChange={e => setNombre(e.target.value)} autoFocus />
        </div>

        <div className="form-group">
          <label className="form-label">Lugar / Sede</label>
          <input className="form-input" type="text" value={lugar} onChange={e => setLugar(e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input className="form-input" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Precio (0 = gratis)</label>
            <input className="form-input" type="number" min="0" value={precio} onChange={e => setPrecio(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tipo de evento</label>
          <select className="form-select" value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="">Selecciona un tipo</option>
            <option value="Deportes">🏅 Deportes</option>
            <option value="Cientifico">🔬 Científico</option>
            <option value="Social">🎉 Social</option>
            <option value="Negocios">💼 Negocios</option>
            <option value="Politico">🏛️ Político</option>
          </select>
        </div>

        <div className="modal-acciones">
          <button className="btn-modal-cancelar" onClick={onCerrar}>Cancelar</button>
          <button className="btn-modal-confirm" onClick={manejarSubmit} disabled={guardando}>
            {guardando ? "Procesando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditarEvento
