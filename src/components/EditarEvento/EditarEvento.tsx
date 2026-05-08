import { useState } from "react"
import "../modal.css"
import Swal from "sweetalert2"

interface Props {
  evento: {
    id: number
    nombre: string
    lugar: string
    fecha: string
    precio: number
    tipo: string
  }
  editar: (id: number, nombre: string, lugar: string, fecha: string, precio: number, tipo: string) => void
  onCerrar: () => void
}

function EditarEvento({ evento, editar, onCerrar }: Props) {
  const [nombre, setNombre]   = useState(evento.nombre)
  const [lugar, setLugar]     = useState(evento.lugar)
  const [fecha, setFecha]     = useState(evento.fecha)
  const [precio, setPrecio]   = useState(String(evento.precio))
  const [tipo, setTipo]       = useState(evento.tipo)
  const [error, setError]     = useState("")

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
    }).then(result => {
      if (result.isConfirmed) {
        editar(evento.id, nombre.trim(), lugar.trim(), fecha, Number(precio || 0), tipo)
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

        <div className="form-group">
          <label className="form-label">Nombre del evento</label>
          <input
            className="form-input"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Lugar / Sede</label>
          <input
            className="form-input"
            type="text"
            value={lugar}
            onChange={e => setLugar(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input
              className="form-input"
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Precio (0 = gratis)</label>
            <input
              className="form-input"
              type="number"
              min="0"
              value={precio}
              onChange={e => setPrecio(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tipo de evento</label>
          <select
            className="form-select"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
          >
            <option value="">Selecciona un tipo</option>
            <option value="Partido">⚽ Partido</option>
            <option value="Entrenamiento">🏃 Entrenamiento</option>
            <option value="Social">🎉 Evento Social</option>
          </select>
        </div>

        <div className="modal-acciones">
          <button className="btn-modal-cancelar" onClick={onCerrar}>Cancelar</button>
          <button className="btn-modal-confirm" onClick={manejarSubmit}>Guardar cambios</button>
        </div>
      </div>
    </div>
  )
}

export default EditarEvento
