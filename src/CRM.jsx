import { useState, useEffect } from 'react'

const Y = '#FFCC00'
const DARK = '#0a0a0a'
const CARD = '#141414'
const BORDER = '#222'
const MUTED = '#888'

const ESTADOS = ['Nuevo', 'En contacto', 'Test drive', 'Propuesta', 'Vendido ✓', 'No avanzó']

const ESTADO_COLOR = {
  'Nuevo': '#3b82f6',
  'En contacto': '#f59e0b',
  'Test drive': '#8b5cf6',
  'Propuesta': '#f97316',
  'Vendido ✓': '#22c55e',
  'No avanzó': '#6b7280',
}

const COLORES_BOREAL = ['Azul Mineral', 'Verde Boreal', 'Blanco', 'Gris', 'Negro', 'Otro']

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function waMsg(lead) {
  return encodeURIComponent(
    `¡Hola ${lead.nombre.split(' ')[0]}! Te habla Romina de Renault Petraglia Cañuelas. Me contactás por el Renault Boreal 2025${lead.color ? ` en ${lead.color}` : ''}. ¿Cuándo te viene bien hablar?`
  )
}

function formatFecha(iso) {
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

const inputStyle = {
  width: '100%',
  background: '#1a1a1a',
  border: `1px solid ${BORDER}`,
  color: '#fff',
  borderRadius: 8,
  padding: '10px 12px',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
}

function FormModal({ onSave, onClose }) {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', color: '', notas: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid = form.nombre.trim() && form.telefono.trim()

  const handleSave = () => {
    if (!valid) return
    onSave({
      id: genId(),
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      email: form.email.trim(),
      color: form.color,
      notas: form.notas.trim(),
      fecha: new Date().toISOString(),
    })
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}
    >
      <div
        style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 28, width: '100%', maxWidth: 440 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 20, color: '#fff' }}>
          Nuevo interesado
        </div>

        {[
          { key: 'nombre', label: 'Nombre y apellido *', placeholder: 'Juan García', type: 'text' },
          { key: 'telefono', label: 'Teléfono / WhatsApp *', placeholder: '2226 123456', type: 'tel' },
          { key: 'email', label: 'Email', placeholder: 'juan@email.com', type: 'email' },
        ].map((f) => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: '0.72rem', color: MUTED, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.label}</div>
            <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={set(f.key)} style={inputStyle} />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: '0.72rem', color: MUTED, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Color preferido</div>
          <select value={form.color} onChange={set('color')} style={{ ...inputStyle }}>
            <option value="">Sin definir</option>
            {COLORES_BOREAL.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: '0.72rem', color: MUTED, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Notas</div>
          <textarea
            placeholder="Quiere financiación, busca para fin de mes, tiene auto a entregar..."
            value={form.notas}
            onChange={set('notas')}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleSave}
            disabled={!valid}
            style={{
              flex: 1,
              background: valid ? Y : '#333',
              color: valid ? '#000' : MUTED,
              fontWeight: 700,
              fontSize: '0.9rem',
              padding: '12px',
              borderRadius: 10,
              border: 'none',
              cursor: valid ? 'pointer' : 'not-allowed',
            }}
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            style={{ background: 'transparent', color: MUTED, fontWeight: 600, fontSize: '0.9rem', padding: '12px 20px', borderRadius: 10, border: `1px solid ${BORDER}`, cursor: 'pointer' }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

function LeadCard({ lead, estado, onEstado, onDelete }) {
  const [confirmDel, setConfirmDel] = useState(false)
  const tel = lead.telefono.replace(/\D/g, '')

  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderLeft: `3px solid ${ESTADO_COLOR[estado]}`,
        borderRadius: 14,
        padding: '16px 20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: 4 }}>{lead.nombre}</div>
          <div style={{ fontSize: '0.8rem', color: MUTED, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span>📱 {lead.telefono}</span>
            {lead.email && <span>✉️ {lead.email}</span>}
            {lead.color && <span>🎨 {lead.color}</span>}
            <span>📅 {formatFecha(lead.fecha)}</span>
          </div>
          {lead.notas && (
            <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: 8, fontStyle: 'italic', lineHeight: 1.45 }}>
              {lead.notas}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <a
            href={`https://wa.me/${tel || lead.telefono}?text=${waMsg(lead)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 36, height: 36, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flexShrink: 0 }}
            title="Escribir por WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          {confirmDel ? (
            <>
              <button
                onClick={() => onDelete(lead.id)}
                style={{ background: '#ef4444', color: '#fff', fontWeight: 700, fontSize: '0.72rem', padding: '6px 10px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
              >
                Borrar
              </button>
              <button
                onClick={() => setConfirmDel(false)}
                style={{ background: 'transparent', color: MUTED, fontSize: '0.72rem', padding: '6px 10px', borderRadius: 8, border: `1px solid ${BORDER}`, cursor: 'pointer' }}
              >
                No
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmDel(true)}
              style={{ width: 36, height: 36, borderRadius: '50%', background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED, cursor: 'pointer', fontSize: '0.9rem' }}
              title="Eliminar"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {ESTADOS.map((e) => (
          <button
            key={e}
            onClick={() => onEstado(lead.id, e)}
            style={{
              padding: '4px 10px',
              borderRadius: 100,
              border: `1px solid ${estado === e ? ESTADO_COLOR[e] : BORDER}`,
              background: estado === e ? ESTADO_COLOR[e] + '22' : 'transparent',
              color: estado === e ? ESTADO_COLOR[e] : MUTED,
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function CRM({ onClose }) {
  const [leads, setLeads] = useState(() => {
    try { return JSON.parse(localStorage.getItem('boreal_leads') || '[]') } catch { return [] }
  })
  const [estados, setEstados] = useState(() => {
    try { return JSON.parse(localStorage.getItem('boreal_estados') || '{}') } catch { return {} }
  })
  const [search, setSearch] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { localStorage.setItem('boreal_leads', JSON.stringify(leads)) }, [leads])
  useEffect(() => { localStorage.setItem('boreal_estados', JSON.stringify(estados)) }, [estados])

  const getEstado = (id) => estados[id] || 'Nuevo'
  const setEstado = (id, val) => setEstados((e) => ({ ...e, [id]: val }))

  const addLead = (lead) => {
    setLeads((l) => [lead, ...l])
    setShowForm(false)
  }

  const deleteLead = (id) => {
    setLeads((l) => l.filter((x) => x.id !== id))
    setEstados((e) => { const n = { ...e }; delete n[id]; return n })
  }

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase()
    const matchSearch = l.nombre.toLowerCase().includes(q) || l.telefono.includes(search)
    const matchEstado = filtroEstado === 'Todos' || getEstado(l.id) === filtroEstado
    return matchSearch && matchEstado
  })

  const statsByEstado = ESTADOS.map((e) => ({
    estado: e,
    count: leads.filter((l) => getEstado(l.id) === e).length,
  })).filter((s) => s.count > 0)

  return (
    <div style={{ background: DARK, minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      <div
        style={{
          borderBottom: `1px solid ${BORDER}`,
          background: CARD,
          padding: '16px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Panel Boreal</div>
            <div style={{ fontSize: '0.72rem', color: MUTED, marginTop: 2 }}>
              {leads.length} {leads.length === 1 ? 'interesado' : 'interesados'} · Romina Petraglia
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setShowForm(true)}
              style={{ background: Y, color: '#000', fontWeight: 700, fontSize: '0.82rem', padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              + Agregar
            </button>
            <button
              onClick={onClose}
              style={{ background: 'transparent', color: MUTED, fontSize: '0.82rem', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, cursor: 'pointer' }}
            >
              ✕ Cerrar
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
        {statsByEstado.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {statsByEstado.map((s) => (
              <div
                key={s.estado}
                style={{ background: CARD, border: `1px solid ${filtroEstado === s.estado ? ESTADO_COLOR[s.estado] : BORDER}`, borderRadius: 10, padding: '8px 14px', display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setFiltroEstado(filtroEstado === s.estado ? 'Todos' : s.estado)}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: ESTADO_COLOR[s.estado], display: 'inline-block' }} />
                <span style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 700 }}>{s.count}</span>
                <span style={{ fontSize: '0.72rem', color: MUTED }}>{s.estado}</span>
              </div>
            ))}
            {filtroEstado !== 'Todos' && (
              <button
                onClick={() => setFiltroEstado('Todos')}
                style={{ background: 'transparent', color: MUTED, fontSize: '0.72rem', padding: '8px 12px', borderRadius: 10, border: `1px solid ${BORDER}`, cursor: 'pointer' }}
              >
                Ver todos
              </button>
            )}
          </div>
        )}

        <input
          placeholder="Buscar por nombre o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            background: CARD,
            border: `1px solid ${BORDER}`,
            color: '#fff',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: '0.88rem',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: 20,
            fontFamily: 'Inter, sans-serif',
          }}
        />

        {leads.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: MUTED }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🚗</div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: 8 }}>
              Todavía no hay interesados
            </div>
            <div style={{ fontSize: '0.88rem', marginBottom: 24 }}>
              Cada vez que alguien consulte por el Boreal, agregalo acá para el seguimiento.
            </div>
            <button
              onClick={() => setShowForm(true)}
              style={{ background: Y, color: '#000', fontWeight: 700, fontSize: '0.9rem', padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer' }}
            >
              + Agregar primer interesado
            </button>
          </div>
        )}

        {leads.length > 0 && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: MUTED }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 600, color: '#fff', marginBottom: 8 }}>Sin resultados</div>
            <div style={{ fontSize: '0.85rem' }}>Probá con otro nombre o limpiá el filtro.</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              estado={getEstado(lead.id)}
              onEstado={setEstado}
              onDelete={deleteLead}
            />
          ))}
        </div>
      </div>

      {showForm && <FormModal onSave={addLead} onClose={() => setShowForm(false)} />}
    </div>
  )
}
