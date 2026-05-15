import { useState } from 'react'

const Y = '#FFCC00'
const DARK = '#0a0a0a'
const CARD = '#141414'
const BORDER = '#222'
const MUTED = '#777'

const CATS = {
  Restaurantes: { color: '#ff6b35', emoji: '🍽️', auto: 'Kangoo Furgón / Master', tag: 'Utilitario' },
  Transporte:   { color: '#2dd4bf', emoji: '🚛', auto: 'Kangoo Furgón / Master', tag: 'Utilitario' },
  Médicos:      { color: '#38bdf8', emoji: '🩺', auto: 'Duster / Captur',        tag: 'SUV' },
  Abogados:     { color: '#c084fc', emoji: '⚖️', auto: 'Koleos / Austral',       tag: 'SUV Premium' },
}

const ESTADO_OPTS = ['Sin contactar', 'Contactado', 'Interesado', 'Cerrado ✓', 'No interesa']
const ESTADO_COLOR = {
  'Sin contactar': '#555',
  'Contactado':    '#3b82f6',
  'Interesado':    '#f59e0b',
  'Cerrado ✓':     '#22c55e',
  'No interesa':   '#6b7280',
}

const FIRMA = '\n\n— Romina Petraglia\nRenault Petraglia · Cañuelas'

function waMsg(p) {
  const auto = CATS[p.categoria].auto
  const msgs = {
    Restaurantes: `Hola, ${p.contacto}! 👋 Soy Romina Petraglia de Renault Petraglia Cañuelas. Te escribo porque tenemos una propuesta especial para el sector gastronómico: *${auto} a tasa 0%*, ideal para delivery, distribución y catering. ¿Tienen pensado renovar o sumar una unidad? Te preparo una cotización sin compromiso 🚐${FIRMA}`,
    Transporte:   `Hola, ${p.contacto}! 👋 Soy Romina Petraglia de Renault Petraglia Cañuelas. Tenemos una propuesta especial para empresas de transporte: *${auto} a tasa 0%*, sin anticipo y sin intereses. Ideal para renovar o ampliar la flota. ¿Hablamos? 🚐${FIRMA}`,
    Médicos:      `Hola, ${p.contacto}! 👋 Soy Romina Petraglia de Renault Petraglia Cañuelas. Le escribo con una propuesta especial para profesionales de la salud: *${auto} a tasa 0%*. Confort, tecnología y seguridad para el día a día. ¿Le preparo una cotización personalizada? 🚙${FIRMA}`,
    Abogados:     `Estimado/a ${p.contacto}, soy Romina Petraglia de Renault Petraglia Cañuelas. Le contacto con una propuesta exclusiva: *${auto} a tasa 0%*, a la altura de su trayectoria profesional. ¿Le preparo una propuesta a medida? 🚙${FIRMA}`,
  }
  return encodeURIComponent(msgs[p.categoria])
}

function mailSubject(p) {
  return encodeURIComponent(`Propuesta Renault ${CATS[p.categoria].auto} – Tasa 0% | Petraglia Cañuelas`)
}

function mailBody(p) {
  const auto = CATS[p.categoria].auto
  const bodies = {
    Restaurantes: `Hola ${p.contacto},\n\nEsperamos que estén muy bien.\n\nDesde Renault Petraglia Cañuelas les acercamos una propuesta especial para el sector gastronómico: ${auto} a tasa 0%, perfecto para delivery, distribución y catering.\n\nLes preparamos una cotización personalizada sin ningún compromiso. ¿Cuándo tienen un momento para charlar?\n\nSaludos,\nRomina Petraglia\nRenault Petraglia · Cañuelas`,
    Transporte:   `Estimado/a ${p.contacto},\n\nEsperamos que estén muy bien.\n\nDesde Renault Petraglia Cañuelas les acercamos una propuesta para empresas de transporte: ${auto} a tasa 0%, sin anticipo ni intereses. Ideal para renovar o ampliar su flota.\n\n¿Tienen disponibilidad para conversar esta semana?\n\nSaludos,\nRomina Petraglia\nRenault Petraglia · Cañuelas`,
    Médicos:      `Estimado/a ${p.contacto},\n\nEspero que se encuentre muy bien.\n\nDesde Renault Petraglia Cañuelas le acercamos una propuesta especial para profesionales de la salud: ${auto} a tasa 0%. Confort, tecnología y seguridad para el día a día.\n\n¿Le interesa que le prepare una cotización personalizada?\n\nQuedo a su disposición,\nRomina Petraglia\nRenault Petraglia · Cañuelas`,
    Abogados:     `Estimado/a ${p.contacto},\n\nEspero que se encuentre muy bien.\n\nDesde Renault Petraglia Cañuelas le acercamos una propuesta exclusiva: ${auto} a tasa 0%. Un vehículo premium a la altura de su trayectoria profesional.\n\nMe gustaría prepararle una propuesta a medida. ¿Cuándo podríamos hablar?\n\nQuedo a su disposición,\nRomina Petraglia\nRenault Petraglia · Cañuelas`,
  }
  return encodeURIComponent(bodies[p.categoria])
}

const PROSPECTOS = [
  // ── RESTAURANTES (1-20) ──────────────────────────────────────────────────────
  { id:1,  categoria:'Restaurantes', nombre:'La Estancia Grill',        contacto:'Juan C. Rodríguez',   wa:'5492226401101', email:'laestanciagrill.can@gmail.com'     },
  { id:2,  categoria:'Restaurantes', nombre:'El Rancho Grande',         contacto:'María E. Gutiérrez',  wa:'5492226401102', email:'elranchograndecanuelas@gmail.com'   },
  { id:3,  categoria:'Restaurantes', nombre:'Pizzería Don Pipo',        contacto:'Giuseppe Lombardi',   wa:'5492226401103', email:'pizzeriadonpipo.can@gmail.com'      },
  { id:4,  categoria:'Restaurantes', nombre:'El Bodegón Cañuelense',    contacto:'Roberto Sosa',        wa:'5492226401104', email:'elbodegon.canuelas@gmail.com'       },
  { id:5,  categoria:'Restaurantes', nombre:'La Casa de Campo',         contacto:'Susana Herrera',      wa:'5492226401105', email:'lacasadecampo.rest@gmail.com'       },
  { id:6,  categoria:'Restaurantes', nombre:'Restaurant El Gaucho',     contacto:'Diego Ramírez',       wa:'5492226401106', email:'restaurantegaucho.can@gmail.com'    },
  { id:7,  categoria:'Restaurantes', nombre:'Parrilla La Criolla',      contacto:'Norma Flores',        wa:'5492226401107', email:'parrillalacriolla.can@gmail.com'    },
  { id:8,  categoria:'Restaurantes', nombre:'Resto-Bar El Almacén',     contacto:'Pablo Torres',        wa:'5492226401108', email:'elalmacenresto.can@gmail.com'       },
  { id:9,  categoria:'Restaurantes', nombre:'La Cantina Italiana',      contacto:'Gino Ferrero',        wa:'5492226401109', email:'lacantina.italiana.can@gmail.com'   },
  { id:10, categoria:'Restaurantes', nombre:'Nonno Pietro Pasta',       contacto:'Aldo Ricci',          wa:'5492226401110', email:'nonnopietropasta@gmail.com'         },
  { id:11, categoria:'Restaurantes', nombre:'El Portal Gourmet',        contacto:'Marcela Vidal',       wa:'5492226401111', email:'elportalgourmet.can@gmail.com'      },
  { id:12, categoria:'Restaurantes', nombre:'La Mateada Cafetería',     contacto:'Graciela Muñoz',      wa:'5492226401112', email:'lamateadacafe.can@gmail.com'        },
  { id:13, categoria:'Restaurantes', nombre:'El Puesto del Chef',       contacto:'Hernán Acevedo',      wa:'5492226401113', email:'elpuestodelchef@gmail.com'          },
  { id:14, categoria:'Restaurantes', nombre:'Brasería Las Talas',       contacto:'Claudia Reyes',       wa:'5492226401114', email:'braserialast.can@gmail.com'         },
  { id:15, categoria:'Restaurantes', nombre:'Confitería Central',       contacto:'Nora Pastorino',      wa:'5492226401115', email:'confiteriacentral.can@gmail.com'    },
  { id:16, categoria:'Restaurantes', nombre:'La Posta del Camino',      contacto:'Luis Mendoza',        wa:'5492226401116', email:'lapostadelcamino.can@gmail.com'     },
  { id:17, categoria:'Restaurantes', nombre:'El Parrón',                contacto:'Raúl Jiménez',        wa:'5492226401117', email:'elparron.canuelas@gmail.com'        },
  { id:18, categoria:'Restaurantes', nombre:'Restaurant Las Acacias',   contacto:'Beatriz Campos',      wa:'5492226401118', email:'lasacacias.rest@gmail.com'          },
  { id:19, categoria:'Restaurantes', nombre:'La Casona Rural',          contacto:'Félix Aranda',        wa:'5492226401119', email:'lacasonarural.can@gmail.com'        },
  { id:20, categoria:'Restaurantes', nombre:'Parrilla Don Facundo',     contacto:'Facundo Villalba',    wa:'5492226401120', email:'parrilla.donfacundo@gmail.com'      },

  // ── TRANSPORTE (21-40) ───────────────────────────────────────────────────────
  { id:21, categoria:'Transporte', nombre:'Transportes Rodríguez e Hijos',    contacto:'Miguel Rodríguez',   wa:'5492226411101', email:'transp.rodriguez.hijos@gmail.com'  },
  { id:22, categoria:'Transporte', nombre:'Fletes y Mudanzas Sur',            contacto:'Oscar Benítez',      wa:'5492226411102', email:'fletesymudanzassur.can@gmail.com'  },
  { id:23, categoria:'Transporte', nombre:'Logística del Sur SA',             contacto:'Ariel Fontana',      wa:'5492226411103', email:'logisticadelsur.sa@gmail.com'      },
  { id:24, categoria:'Transporte', nombre:'Transportes Hermanos López',       contacto:'Javier López',       wa:'5492226411104', email:'transp.hlopez.can@gmail.com'       },
  { id:25, categoria:'Transporte', nombre:'Remises Cañuelas Centro',          contacto:'Sergio Aguirre',     wa:'5492226411105', email:'remisescanuelas.ctro@gmail.com'    },
  { id:26, categoria:'Transporte', nombre:'Transportes Agropecuarios García', contacto:'Rubén García',       wa:'5492226411106', email:'transp.agrogcia.can@gmail.com'     },
  { id:27, categoria:'Transporte', nombre:'Flete Express Zona Sur',           contacto:'Lucas Giménez',      wa:'5492226411107', email:'fleteexpresssur.can@gmail.com'     },
  { id:28, categoria:'Transporte', nombre:'Distribuidora Las Flores',         contacto:'Néstor Alvarado',    wa:'5492226411108', email:'distriblasflores.can@gmail.com'    },
  { id:29, categoria:'Transporte', nombre:'Transportes Del Campo',            contacto:'Carlos Ibáñez',      wa:'5492226411109', email:'transportesdelcampo@gmail.com'     },
  { id:30, categoria:'Transporte', nombre:'Mudanzas Martínez',                contacto:'Alejandro Martínez', wa:'5492226411110', email:'mudanzasmartinez.can@gmail.com'    },
  { id:31, categoria:'Transporte', nombre:'Transportes Rurales SAC',          contacto:'Ernesto Blanco',     wa:'5492226411111', email:'transp.rurales.sac@gmail.com'      },
  { id:32, categoria:'Transporte', nombre:'Cañuelas Cargas y Logística',      contacto:'Sebastián Cruz',     wa:'5492226411112', email:'canuelascargaslog@gmail.com'       },
  { id:33, categoria:'Transporte', nombre:'Fletes del Oeste BA',              contacto:'Gustavo Pereyra',    wa:'5492226411113', email:'fletesdloeste.ba@gmail.com'        },
  { id:34, categoria:'Transporte', nombre:'Transportes Agostina',             contacto:'Agostina Fernández', wa:'5492226411114', email:'transportes.agostina@gmail.com'    },
  { id:35, categoria:'Transporte', nombre:'Distribuidora Sur Express',        contacto:'Daniel Salinas',     wa:'5492226411115', email:'distribsurexpress.can@gmail.com'   },
  { id:36, categoria:'Transporte', nombre:'Remises El Pampeano',              contacto:'Horacio Durán',      wa:'5492226411116', email:'remisespampeano.can@gmail.com'     },
  { id:37, categoria:'Transporte', nombre:'Transportes Sánchez',              contacto:'Ricardo Sánchez',    wa:'5492226411117', email:'transpssanchez.can@gmail.com'      },
  { id:38, categoria:'Transporte', nombre:'Carga y Mudanza Delta',            contacto:'Julio Méndez',       wa:'5492226411118', email:'cargamudanzadelta@gmail.com'       },
  { id:39, categoria:'Transporte', nombre:'Fletes Cañuelas Centro',           contacto:'Jorge Maldonado',    wa:'5492226411119', email:'fletescanuelas.ctro@gmail.com'     },
  { id:40, categoria:'Transporte', nombre:'El Cruce Transportes',             contacto:'Adrián Villarreal',  wa:'5492226411120', email:'elcrucetr.can@gmail.com'           },

  // ── MÉDICOS (41-60) ──────────────────────────────────────────────────────────
  { id:41, categoria:'Médicos', nombre:'Dr. Martín Álvarez',     contacto:'Dr. Martín Álvarez',     wa:'5491115201001', email:'drmartinalvarez.med@gmail.com'   },
  { id:42, categoria:'Médicos', nombre:'Dra. Valeria Rossi',     contacto:'Dra. Valeria Rossi',     wa:'5491115201002', email:'dravaleria.rossi.ped@gmail.com'   },
  { id:43, categoria:'Médicos', nombre:'Dr. Pablo Fernández',    contacto:'Dr. Pablo Fernández',    wa:'5491115201003', email:'drpablo.fernandez.card@gmail.com' },
  { id:44, categoria:'Médicos', nombre:'Dra. Silvia Méndez',     contacto:'Dra. Silvia Méndez',     wa:'5491115201004', email:'dra.silviamendez.ob@gmail.com'    },
  { id:45, categoria:'Médicos', nombre:'Dr. Jorge Castillo',     contacto:'Dr. Jorge Castillo',     wa:'5491115201005', email:'drjorge.castillo.trau@gmail.com'  },
  { id:46, categoria:'Médicos', nombre:'Dra. Andrea López',      contacto:'Dra. Andrea López',      wa:'5491115201006', email:'draandrea.lopez.derm@gmail.com'   },
  { id:47, categoria:'Médicos', nombre:'Dr. Roberto Giménez',    contacto:'Dr. Roberto Giménez',    wa:'5491115201007', email:'drroberto.gimenez.cir@gmail.com'  },
  { id:48, categoria:'Médicos', nombre:'Dra. Carolina Pérez',    contacto:'Dra. Carolina Pérez',    wa:'5491115201008', email:'dracarolina.perez.neu@gmail.com'  },
  { id:49, categoria:'Médicos', nombre:'Dr. Sebastián Mora',     contacto:'Dr. Sebastián Mora',     wa:'5491115201009', email:'drsebastian.mora.oft@gmail.com'   },
  { id:50, categoria:'Médicos', nombre:'Dra. Laura González',    contacto:'Dra. Laura González',    wa:'5491115201010', email:'dralaura.gonzalez.psi@gmail.com'  },
  { id:51, categoria:'Médicos', nombre:'Dr. Diego Suárez',       contacto:'Dr. Diego Suárez',       wa:'5491115201011', email:'drdiego.suarez.odont@gmail.com'   },
  { id:52, categoria:'Médicos', nombre:'Dra. Marcela Herrera',   contacto:'Dra. Marcela Herrera',   wa:'5491115201012', email:'dramarcela.herrera.gin@gmail.com' },
  { id:53, categoria:'Médicos', nombre:'Dr. Gustavo Ríos',       contacto:'Dr. Gustavo Ríos',       wa:'5491115201013', email:'drgustavo.rios.fisio@gmail.com'   },
  { id:54, categoria:'Médicos', nombre:'Dra. Patricia Navarro',  contacto:'Dra. Patricia Navarro',  wa:'5491115201014', email:'drapatricia.navarro.end@gmail.com'},
  { id:55, categoria:'Médicos', nombre:'Dr. Alejandro Blanco',   contacto:'Dr. Alejandro Blanco',   wa:'5491115201015', email:'dralejandro.blanco.ur@gmail.com'  },
  { id:56, categoria:'Médicos', nombre:'Dra. Natalia Vega',      contacto:'Dra. Natalia Vega',      wa:'5491115201016', email:'dranatalia.vega.reu@gmail.com'    },
  { id:57, categoria:'Médicos', nombre:'Dr. Gabriel Cruz',       contacto:'Dr. Gabriel Cruz',       wa:'5491115201017', email:'drgabriel.cruz.med@gmail.com'     },
  { id:58, categoria:'Médicos', nombre:'Dra. Mónica Ramos',      contacto:'Dra. Mónica Ramos',      wa:'5491115201018', email:'dramonica.ramos.nut@gmail.com'    },
  { id:59, categoria:'Médicos', nombre:'Dr. Fernando Ibáñez',    contacto:'Dr. Fernando Ibáñez',    wa:'5491115201019', email:'drfernando.ibanez.cl@gmail.com'   },
  { id:60, categoria:'Médicos', nombre:'Dra. Claudia Moreno',    contacto:'Dra. Claudia Moreno',    wa:'5491115201020', email:'draclaudia.moreno.ped@gmail.com'  },

  // ── ABOGADOS (61-80) ─────────────────────────────────────────────────────────
  { id:61, categoria:'Abogados', nombre:'Dr. Hernán Gómez',         contacto:'Dr. Hernán Gómez',         wa:'5491115301001', email:'dr.hernan.gomez.abog@gmail.com'     },
  { id:62, categoria:'Abogados', nombre:'Dra. Beatriz Sosa',        contacto:'Dra. Beatriz Sosa',        wa:'5491115301002', email:'dra.beatriz.sosa.fam@gmail.com'     },
  { id:63, categoria:'Abogados', nombre:'Dr. Ricardo Vargas',       contacto:'Dr. Ricardo Vargas',       wa:'5491115301003', email:'estudio.vargas.abog@gmail.com'       },
  { id:64, categoria:'Abogados', nombre:'Esc. Isabel Paredes',      contacto:'Esc. Isabel Paredes',      wa:'5491115301004', email:'escribania.paredes.can@gmail.com'    },
  { id:65, categoria:'Abogados', nombre:'Dr. Luis Pereyra',         contacto:'Dr. Luis Pereyra',         wa:'5491115301005', email:'dr.luis.pereyra.lab@gmail.com'       },
  { id:66, categoria:'Abogados', nombre:'Dra. Verónica Sánchez',    contacto:'Dra. Verónica Sánchez',    wa:'5491115301006', email:'dra.veronica.sanchez.pen@gmail.com'  },
  { id:67, categoria:'Abogados', nombre:'Dr. Marcos Díaz',          contacto:'Dr. Marcos Díaz',          wa:'5491115301007', email:'estudio.marcos.diaz@gmail.com'       },
  { id:68, categoria:'Abogados', nombre:'Dra. Nora Acosta',         contacto:'Dra. Nora Acosta',         wa:'5491115301008', email:'dra.nora.acosta.civ@gmail.com'       },
  { id:69, categoria:'Abogados', nombre:'Dr. Osvaldo Paz',          contacto:'Dr. Osvaldo Paz',          wa:'5491115301009', email:'dr.osvaldo.paz.suc@gmail.com'        },
  { id:70, categoria:'Abogados', nombre:'Esc. Cristina Ruiz',       contacto:'Esc. Cristina Ruiz',       wa:'5491115301010', email:'escribania.ruiz.can@gmail.com'       },
  { id:71, categoria:'Abogados', nombre:'Dr. Ernesto Domínguez',    contacto:'Dr. Ernesto Domínguez',    wa:'5491115301011', email:'estudio.dominguez.abog@gmail.com'    },
  { id:72, categoria:'Abogados', nombre:'Dra. Marta Fuentes',       contacto:'Dra. Marta Fuentes',       wa:'5491115301012', email:'dra.marta.fuentes.com@gmail.com'    },
  { id:73, categoria:'Abogados', nombre:'Dr. Claudio Medina',       contacto:'Dr. Claudio Medina',       wa:'5491115301013', email:'estudio.claudio.medina@gmail.com'    },
  { id:74, categoria:'Abogados', nombre:'Dra. Elena Torres',        contacto:'Dra. Elena Torres',        wa:'5491115301014', email:'dra.elena.torres.prop@gmail.com'     },
  { id:75, categoria:'Abogados', nombre:'Dr. Hugo Villalba',        contacto:'Dr. Hugo Villalba',        wa:'5491115301015', email:'dr.hugo.villalba.pen@gmail.com'      },
  { id:76, categoria:'Abogados', nombre:'Dra. Adriana Bustamante',  contacto:'Dra. Adriana Bustamante',  wa:'5491115301016', email:'dra.adriana.bustamante@gmail.com'    },
  { id:77, categoria:'Abogados', nombre:'Dr. Eduardo Ríos',         contacto:'Dr. Eduardo Ríos',         wa:'5491115301017', email:'dr.eduardo.rios.abog@gmail.com'      },
  { id:78, categoria:'Abogados', nombre:'Esc. Rosa Alvarado',       contacto:'Esc. Rosa Alvarado',       wa:'5491115301018', email:'escribania.alvarado.can@gmail.com'   },
  { id:79, categoria:'Abogados', nombre:'Dr. Carlos Benítez',       contacto:'Dr. Carlos Benítez',       wa:'5491115301019', email:'estudio.benitez.corp@gmail.com'      },
  { id:80, categoria:'Abogados', nombre:'Dra. Gloria Espinoza',     contacto:'Dra. Gloria Espinoza',     wa:'5491115301020', email:'dra.gloria.espinoza@gmail.com'       },
]

export default function CRM({ onClose }) {
  const [filtro, setFiltro] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [estados, setEstados] = useState(() => {
    try { return JSON.parse(localStorage.getItem('crm_estados') || '{}') } catch { return {} }
  })

  const guardar = (id, val) => {
    const nuevo = { ...estados, [id]: val }
    setEstados(nuevo)
    localStorage.setItem('crm_estados', JSON.stringify(nuevo))
  }

  const getEstado = (id) => estados[id] || 'Sin contactar'

  const visible = PROSPECTOS
    .filter(p => filtro === 'Todos' || p.categoria === filtro)
    .filter(p => {
      if (!busqueda) return true
      const q = busqueda.toLowerCase()
      return p.nombre.toLowerCase().includes(q) || p.contacto.toLowerCase().includes(q)
    })

  const totalContactados = PROSPECTOS.filter(p => {
    const e = getEstado(p.id)
    return e !== 'Sin contactar' && e !== 'No interesa'
  }).length

  const totalCerrados = PROSPECTOS.filter(p => getEstado(p.id) === 'Cerrado ✓').length
  const totalSinContactar = PROSPECTOS.filter(p => getEstado(p.id) === 'Sin contactar').length

  return (
    <div style={{ background: DARK, minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#f0f0f0' }}>

      {/* ── Header sticky ── */}
      <div style={{
        background: CARD,
        borderBottom: `1px solid ${BORDER}`,
        padding: '14px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: `1px solid ${BORDER}`, color: '#fff', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'Inter, sans-serif' }}
            >
              ← Volver
            </button>
            <div>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem', lineHeight: 1.2 }}>Panel de Prospectos</div>
              <div style={{ color: MUTED, fontSize: '0.72rem' }}>Romina Petraglia · Renault Petraglia Cañuelas</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: 700 }}>✓ {totalCerrados} cerrados</span>
            <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>● {totalContactados} en gestión</span>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { label: 'Total prospectos', value: PROSPECTOS.length, color: '#fff' },
            { label: 'Sin contactar',    value: totalSinContactar,  color: MUTED },
            { label: 'En gestión',       value: totalContactados,   color: '#f59e0b' },
            { label: 'Cerrados',         value: totalCerrados,      color: '#22c55e' },
          ].map((st, i) => (
            <div
              key={st.label}
              style={{
                padding: '18px 20px',
                borderRight: i < 3 ? `1px solid ${BORDER}` : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 900, color: st.color, lineHeight: 1 }}>{st.value}</div>
              <div style={{ fontSize: '0.65rem', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filtros + Búsqueda ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 20px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {['Todos', 'Restaurantes', 'Transporte', 'Médicos', 'Abogados'].map(cat => {
          const count = cat === 'Todos' ? PROSPECTOS.length : PROSPECTOS.filter(p => p.categoria === cat).length
          const active = filtro === cat
          return (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              style={{
                background: active ? Y : 'transparent',
                color: active ? '#000' : '#ccc',
                border: `1px solid ${active ? Y : BORDER}`,
                borderRadius: 100,
                padding: '6px 16px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
              }}
            >
              {cat === 'Todos' ? `Todos (${count})` : `${CATS[cat].emoji} ${cat} (${count})`}
            </button>
          )
        })}
        <input
          type="text"
          placeholder="Buscar nombre o contacto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{
            marginLeft: 'auto',
            background: CARD,
            border: `1px solid ${BORDER}`,
            borderRadius: 8,
            padding: '8px 14px',
            color: '#fff',
            fontSize: '0.82rem',
            width: 240,
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
        />
      </div>

      {/* ── Contador resultado ── */}
      {busqueda && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px 10px', color: MUTED, fontSize: '0.78rem' }}>
          {visible.length} resultado{visible.length !== 1 ? 's' : ''} para "{busqueda}"
        </div>
      )}

      {/* ── Grid de prospectos ── */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 20px 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 12,
      }}>
        {visible.map(p => {
          const cat = CATS[p.categoria]
          const estado = getEstado(p.id)
          return (
            <div
              key={p.id}
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderLeft: `3px solid ${cat.color}`,
                borderRadius: 12,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {/* Top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: 6 }}>
                    <span style={{
                      fontSize: '0.65rem',
                      background: cat.color + '22',
                      color: cat.color,
                      border: `1px solid ${cat.color}55`,
                      borderRadius: 100,
                      padding: '2px 8px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}>
                      {cat.emoji} {cat.tag}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem', lineHeight: 1.3 }}>{p.nombre}</div>
                  <div style={{ color: MUTED, fontSize: '0.78rem', marginTop: 2 }}>{p.contacto}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.78rem' }}>{cat.auto}</div>
                  <div style={{ color: Y, fontSize: '0.68rem', fontWeight: 700 }}>Tasa 0%</div>
                </div>
              </div>

              {/* Estado selector */}
              <select
                value={estado}
                onChange={e => guardar(p.id, e.target.value)}
                style={{
                  background: ESTADO_COLOR[estado] + '18',
                  border: `1px solid ${ESTADO_COLOR[estado]}`,
                  color: ESTADO_COLOR[estado],
                  borderRadius: 8,
                  padding: '6px 10px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  width: '100%',
                }}
              >
                {ESTADO_OPTS.map(opt => (
                  <option key={opt} value={opt} style={{ background: '#1a1a1a', color: '#fff' }}>{opt}</option>
                ))}
              </select>

              {/* Botones de contacto */}
              <div style={{ display: 'flex', gap: 8 }}>
                <a
                  href={`https://wa.me/${p.wa}?text=${waMsg(p)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                    background: '#25D36618',
                    border: '1px solid #25D36688',
                    color: '#25D366',
                    borderRadius: 8,
                    padding: '9px 6px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#25D36630'}
                  onMouseOut={e => e.currentTarget.style.background = '#25D36618'}
                >
                  💬 WhatsApp
                </a>
                <a
                  href={`mailto:${p.email}?subject=${mailSubject(p)}&body=${mailBody(p)}`}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                    background: '#3b82f618',
                    border: '1px solid #3b82f688',
                    color: '#3b82f6',
                    borderRadius: 8,
                    padding: '9px 6px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#3b82f630'}
                  onMouseOut={e => e.currentTarget.style.background = '#3b82f618'}
                >
                  ✉️ Email
                </a>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        select option { background: #1a1a1a; color: #fff; }
        input::placeholder { color: #555; }
        input:focus { border-color: #444 !important; }
      `}</style>
    </div>
  )
}
