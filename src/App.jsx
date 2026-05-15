import { useState, useEffect, useRef } from 'react'
import CRM from './CRM'

// ─── CONFIGURACIÓN — editá estos datos ───────────────────────────────────────
const CONFIG = {
  marca: 'Renault',
  modelo: 'Kwid Outsider',
  anio: '2022',
  km: '32.000',
  precio: '$11.500.000',
  precioAnterior: '$12.800.000',
  whatsapp: 'https://wa.me/5491155550000',
  whatsappMsg: '¡Hola! Vi tu publicación del Renault Kwid Outsider 2022 y me interesa. ¿Podés darme más info?',
  vendedora: 'Romina Petraglia',
  zona: 'Cañuelas, Buenos Aires',
  // Imágenes en /public — renombrá tus fotos así:
  imagenes: [
    '/auto1.jpg',
    '/auto2.jpg',
    '/auto3.jpg',
    '/auto4.jpg',
    '/auto5.jpg',
  ],
  beneficios: [
    { icon: '📋', titulo: 'Papeles al día', desc: 'VTV vigente, patente sin deuda, listo para transferir hoy.' },
    { icon: '🔧', titulo: 'Impecable mecánica', desc: 'Service al día, motor y caja en perfecto estado.' },
    { icon: '✨', titulo: 'Interior como nuevo', desc: 'Tapizado sin manchas, aire acondicionado frío.' },
    { icon: '🛡️', titulo: 'Sin choques', desc: 'Carrocería original, sin golpes ni pintura.' },
    { icon: '⛽', titulo: 'Nafta y GNC', desc: 'Doble combustible. Ahorrás desde el primer día.' },
    { icon: '🚗', titulo: 'Único dueño', desc: 'Siempre guardado en cochera, uso particular.' },
  ],
}
// ─────────────────────────────────────────────────────────────────────────────

const WA_LINK = `${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMsg)}`

const Y = '#FFCC00'
const DARK = '#0a0a0a'
const CARD = '#141414'
const BORDER = '#222'
const MUTED = '#888'

// ── Estilos reutilizables ────────────────────────────────────────────────────
const s = {
  tag: {
    display: 'inline-block',
    border: `1px solid ${Y}`,
    color: Y,
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: 100,
    marginBottom: 16,
  },
  btnWa: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    background: '#25D366',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1rem',
    padding: '16px 32px',
    borderRadius: 12,
    border: 'none',
    boxShadow: '0 4px 24px rgba(37,211,102,0.35)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textDecoration: 'none',
    width: '100%',
    justifyContent: 'center',
    maxWidth: 400,
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background: 'transparent',
    color: '#f0f0f0',
    fontWeight: 600,
    fontSize: '0.9rem',
    padding: '14px 28px',
    borderRadius: 12,
    border: `1px solid ${BORDER}`,
    transition: 'border-color 0.2s',
    textDecoration: 'none',
    width: '100%',
    maxWidth: 400,
  },
  section: {
    padding: '64px 20px',
    maxWidth: 900,
    margin: '0 auto',
  },
  sectionTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: 12,
  },
  sectionSub: {
    fontSize: '1rem',
    color: MUTED,
    lineHeight: 1.65,
    marginBottom: 40,
    maxWidth: 560,
  },
}

// ── Componente FAB WhatsApp ──────────────────────────────────────────────────
function WhatsAppFAB() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 999,
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(37,211,102,0.5)',
        fontSize: '1.8rem',
        transform: visible ? 'scale(1)' : 'scale(0)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s',
      }}
      aria-label="Consultar por WhatsApp"
    >
      <WaIcon size={32} color="#fff" />
    </a>
  )
}

// ── SVG WhatsApp ─────────────────────────────────────────────────────────────
function WaIcon({ size = 24, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Imagen de fondo */}
      <img
        src={CONFIG.imagenes[0]}
        alt={`${CONFIG.marca} ${CONFIG.modelo}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        onError={(e) => {
          e.target.style.display = 'none'
        }}
      />

      {/* Gradiente overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      {/* Badge superior */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${BORDER}`,
          borderRadius: 100,
          padding: '6px 14px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: Y,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        🔥 OPORTUNIDAD ÚNICA
      </div>

      {/* Contenido */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 20px 48px',
          maxWidth: 900,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={s.tag}>
          {CONFIG.anio} · {CONFIG.km} km · {CONFIG.zona}
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.4rem, 9vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            color: '#fff',
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}
        >
          {CONFIG.marca}
          <br />
          <span style={{ color: Y }}>{CONFIG.modelo}</span>
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6,
            marginBottom: 32,
            maxWidth: 480,
          }}
        >
          Listo para transferir hoy. Papeles al día, impecable estado, sin
          choques. El auto que buscabas al mejor precio del mercado.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={s.btnWa}>
            <WaIcon size={22} color="#fff" />
            Consultar por WhatsApp
          </a>
          <a href="#galeria" style={s.btnSecondary}>
            📸 Ver todas las fotos
          </a>
        </div>
      </div>
    </section>
  )
}

// ── SPECS BAR ────────────────────────────────────────────────────────────────
function SpecsBar() {
  const specs = [
    { label: 'Año', value: CONFIG.anio },
    { label: 'Kilómetros', value: CONFIG.km + ' km' },
    { label: 'Combustible', value: 'Nafta / GNC' },
    { label: 'Transmisión', value: 'Manual' },
  ]

  return (
    <div
      style={{
        background: CARD,
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {specs.map((sp, i) => (
          <div
            key={sp.label}
            style={{
              padding: '20px 24px',
              borderRight: i % 2 === 0 ? `1px solid ${BORDER}` : 'none',
              borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#fff',
                marginBottom: 4,
              }}
            >
              {sp.value}
            </div>
            <div style={{ fontSize: '0.7rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {sp.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── BENEFICIOS ───────────────────────────────────────────────────────────────
function Beneficios() {
  return (
    <section style={{ ...s.section, paddingBottom: 48 }}>
      <div style={s.tag}>✦ Por qué comprar este auto</div>
      <h2 style={s.sectionTitle}>Todo lo que necesitás saber</h2>
      <p style={s.sectionSub}>
        Sin sorpresas. Este auto está auditado y listo para entregar. Revisá cada
        detalle antes de contactarnos.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {CONFIG.beneficios.map((b) => (
          <div
            key={b.titulo}
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 14,
              padding: '24px 20px',
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>
              {b.icon}
            </span>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#fff',
                  marginBottom: 4,
                }}
              >
                {b.titulo}
              </div>
              <div style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.55 }}>
                {b.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── GALERIA ──────────────────────────────────────────────────────────────────
function Galeria() {
  const [selected, setSelected] = useState(null)

  return (
    <section
      id="galeria"
      style={{
        background: CARD,
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div style={s.section}>
        <div style={s.tag}>✦ Galería</div>
        <h2 style={s.sectionTitle}>Fotos reales del auto</h2>
        <p style={s.sectionSub}>
          Lo que ves es lo que recibís. Sin filtros, sin retoques.
        </p>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 8,
          }}
        >
          {CONFIG.imagenes.map((src, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              style={{
                gridColumn: i === 0 ? '1 / -1' : 'auto',
                aspectRatio: i === 0 ? '16/9' : '4/3',
                overflow: 'hidden',
                borderRadius: i === 0 ? 14 : 10,
                cursor: 'pointer',
                position: 'relative',
                background: '#1a1a1a',
              }}
            >
              <img
                src={src}
                alt={`Foto ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                onError={(e) => {
                  e.target.parentElement.style.background = '#1a1a1a'
                  e.target.style.display = 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 100,
                  letterSpacing: '0.06em',
                }}
              >
                {i + 1}/{CONFIG.imagenes.length}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 900,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <img
            src={CONFIG.imagenes[selected]}
            alt={`Foto ${selected + 1}`}
            style={{
              maxWidth: '95vw',
              maxHeight: '90vh',
              borderRadius: 12,
              objectFit: 'contain',
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {/* Prev / Next */}
          {selected > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelected(selected - 1) }}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '1.6rem',
                width: 48,
                height: 48,
                borderRadius: '50%',
              }}
            >
              ‹
            </button>
          )}
          {selected < CONFIG.imagenes.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelected(selected + 1) }}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '1.6rem',
                width: 48,
                height: 48,
                borderRadius: '50%',
              }}
            >
              ›
            </button>
          )}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              fontSize: '1.2rem',
              width: 40,
              height: 40,
              borderRadius: '50%',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}

// ── PRECIO ───────────────────────────────────────────────────────────────────
function Precio() {
  const [time, setTime] = useState({ h: '23', m: '59', s: '59' })

  useEffect(() => {
    const target = new Date()
    target.setHours(23, 59, 59, 0)
    const tick = () => {
      const now = new Date()
      const diff = target - now
      if (diff <= 0) return
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0')
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
      const sec = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
      setTime({ h, m, s: sec })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{ padding: '64px 20px' }}>
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          background: CARD,
          border: `1px solid ${BORDER}`,
          borderRadius: 20,
          padding: 'clamp(28px, 5vw, 48px)',
          textAlign: 'center',
        }}
      >
        {/* Urgencia */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,77,77,0.1)',
            border: '1px solid rgba(255,77,77,0.3)',
            borderRadius: 100,
            padding: '6px 16px',
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#ff4d4d',
              animation: 'pulse 1.5s infinite',
            }}
          />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff4d4d', letterSpacing: '0.08em' }}>
            PRECIO VÁLIDO POR HOY
          </span>
        </div>

        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              fontSize: '1rem',
              color: MUTED,
              textDecoration: 'line-through',
              marginRight: 8,
            }}
          >
            Antes: {CONFIG.precioAnterior}
          </span>
        </div>

        <div
          style={{
            fontSize: 'clamp(3rem, 12vw, 5.5rem)',
            fontWeight: 900,
            color: Y,
            lineHeight: 1,
            marginBottom: 8,
            letterSpacing: '-0.02em',
          }}
        >
          {CONFIG.precio}
        </div>

        <p style={{ color: MUTED, fontSize: '0.88rem', marginBottom: 32 }}>
          Precio final. Sin gastos ocultos. Transferencia incluida.
        </p>

        {/* Countdown */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            marginBottom: 36,
          }}
        >
          {[
            { v: time.h, l: 'horas' },
            { v: time.m, l: 'min' },
            { v: time.s, l: 'seg' },
          ].map(({ v, l }) => (
            <div
              key={l}
              style={{
                background: '#1a1a1a',
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                padding: '12px 18px',
                minWidth: 68,
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1,
                }}
              >
                {v}
              </div>
              <div style={{ fontSize: '0.6rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
                {l}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={s.btnWa}>
            <WaIcon size={22} color="#fff" />
            Quiero este auto — Consultar ahora
          </a>
          <p style={{ fontSize: '0.78rem', color: MUTED }}>
            Respondemos en minutos · Sin compromiso
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}

// ── CONTACTO / FOOTER ────────────────────────────────────────────────────────
function Footer({ onCRM }) {
  const clicksRef = useRef(0)
  const timerRef = useRef(null)

  const handleSecretClick = () => {
    clicksRef.current += 1
    clearTimeout(timerRef.current)
    if (clicksRef.current >= 5) {
      clicksRef.current = 0
      onCRM()
    } else {
      timerRef.current = setTimeout(() => { clicksRef.current = 0 }, 2000)
    }
  }

  return (
    <footer
      style={{
        borderTop: `1px solid ${BORDER}`,
        background: CARD,
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            color: '#fff',
            marginBottom: 4,
          }}
        >
          {CONFIG.vendedora}
        </div>
        <div style={{ fontSize: '0.85rem', color: MUTED, marginBottom: 24 }}>
          Venta particular · {CONFIG.zona}
        </div>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...s.btnWa,
            margin: '0 auto',
          }}
        >
          <WaIcon size={20} color="#fff" />
          Abrir WhatsApp
        </a>

        <p
          onClick={handleSecretClick}
          style={{ fontSize: '0.72rem', color: '#444', marginTop: 32, cursor: 'default', userSelect: 'none' }}
        >
          © 2025 · Venta particular · {CONFIG.marca} {CONFIG.modelo} {CONFIG.anio}
        </p>
      </div>
    </footer>
  )
}

// ── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [verCRM, setVerCRM] = useState(() =>
    new URLSearchParams(window.location.search).has('panel')
  )

  const abrirCRM = () => {
    setVerCRM(true)
    window.history.replaceState({}, '', '?panel')
  }

  const cerrarCRM = () => {
    setVerCRM(false)
    window.history.replaceState({}, '', window.location.pathname)
  }

  if (verCRM) return <CRM onClose={cerrarCRM} />

  return (
    <div style={{ background: DARK, minHeight: '100vh' }}>
      <Hero />
      <SpecsBar />
      <Beneficios />
      <Galeria />
      <Precio />
      <Footer onCRM={abrirCRM} />
      <WhatsAppFAB />
    </div>
  )
}
