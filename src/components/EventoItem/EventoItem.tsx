import "./EventoItem.css"
import Swal from "sweetalert2"

interface Props {
  id: number
  nombre: string
  lugar: string
  fecha: string
  precio: number
  tipo: string
  imagen_url?: string | null
  onEliminar: () => void
  onEditar: () => void
}

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const IconCal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

function formatFecha(fecha: string) {
  const [year, month, day] = fecha.split("-")
  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]
  return `${day} ${meses[parseInt(month) - 1]} ${year}`
}

function EventoItem({ nombre, lugar, fecha, precio, tipo, imagen_url, onEliminar, onEditar }: Props) {
  const tipoKey = tipo?.toLowerCase() ?? ""

  const handleEliminar = () => {
    Swal.fire({
      title: "¿Eliminar este evento?",
      text: `"${nombre}" será eliminado permanentemente.`,
      icon: "warning",
      background: "#12151c",
      color: "#e8eaf0",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ff2d4e",
      cancelButtonColor: "#1a1e29",
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          icon: "success",
          background: "#12151c",
          color: "#e8eaf0",
          confirmButtonColor: "#1a56ff",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => onEliminar())
      }
    })
  }

  return (
    <div className="evento-card">
      <div className={`evento-acento evento-acento-${tipoKey}`} />

      {/* Imagen del evento */}
      {imagen_url && (
        <div className="evento-imagen-wrap">
          <img src={imagen_url} alt={nombre} className="evento-imagen" />
        </div>
      )}

      <div className="evento-contenido">
        <div className="evento-top">
          <span className="evento-nombre">{nombre}</span>
          <span className={`badge badge-${tipoKey}`}>{tipo}</span>
        </div>
        <div className="evento-meta">
          <span className="meta-item"><IconPin />{lugar}</span>
          <span className="meta-item"><IconCal />{formatFecha(fecha)}</span>
          <span className={`precio-tag ${precio === 0 ? "precio-gratuito" : "precio-normal"}`}>
            {precio === 0 ? "Gratuito" : `$${precio.toLocaleString("es-MX")}`}
          </span>
        </div>
      </div>

      <div className="evento-acciones">
        <button className="btn-editar" onClick={onEditar}>Editar</button>
        <button className="btn-eliminar" onClick={handleEliminar}>Eliminar</button>
      </div>
    </div>
  )
}

export default EventoItem
