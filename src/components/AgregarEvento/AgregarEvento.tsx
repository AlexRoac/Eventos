import { useState } from "react"
import "../modal.css"

interface Props {
  insertar: (nombre: string, lugar: string, fecha: string, precio: number, tipo: string) => void
  onCerrar: () => void
}

function AgregarEvento({ insertar, onCerrar }: Props) {
  const [nombre, setNombre]   = useState("")
  const [lugar, setLugar]     = useState("")
  const [fecha, setFecha]     = useState("")
  const [precio, setPrecio]   = useState("")
  const [tipo, setTipo]       = useState("")
  const [error, setError]     = useState("")

  const manejarSubmit = () => {
    if (!nombre.trim() || !lugar.trim() || !fecha || !tipo) {
      setError("Todos los campos son obligatorios.")
      return
    }
    if (precio !== "" && Number(precio) < 0) {
      setError("El precio no puede ser negativo.")
      return
    }
    insertar(nombre.trim(), lugar.trim(), fecha, Number(precio || 0), tipo)
    onCerrar()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCerrar()}>
      <div className="modal-box">
        <div className="modal-header">
          <p className="modal-titulo">Nuevo evento</p>
          <p className="modal-subtitulo">Registra un partido, entrenamiento o evento social.</p>
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="form-group">
          <label className="form-label">Nombre del evento</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ej. Partido vs América"
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
            placeholder="Ej. Estadio Azteca"
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
              placeholder="0"
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
          <button className="btn-modal-confirm" onClick={manejarSubmit}>Agregar evento</button>
        </div>
      </div>
    </div>
  )
}

export default AgregarEvento
