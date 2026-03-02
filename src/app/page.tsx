'use client'

import { useState, useEffect, useRef } from 'react'

// ============================================================================
// CHATBOT - Improved with Better Responses
// ============================================================================
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: '¡Hola! 👋 Soy el asistente de A Rúa. ¿En qué puedo ayudarte?' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Clear conversation when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMessages([{ role: 'bot', text: '¡Hola! 👋 Soy el asistente de A Rúa. ¿En qué puedo ayudarte?' }])
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const getResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase().trim()
    
    // Best beers / Mejores cervezas
    if (msg.match(/cerveza|cervezas|mejor cerveza|caña|jarra|qué cerveza|que cerveza/)) {
      return '🍻 Nuestras cervezas:\n\n• Estrella Galicia Bodega (copa 3,60€ / jarra 4,60€)\n• 1906 - más premium (copa 4,10€ / jarra 5,10€)\n• Red Vintage - especial (4,80€)\n• Sin gluten disponible (3,60€)\n\nLa 1906 es la favorita de nuestros clientes. ¡Perfecta con unas tapas!'
    }
    
    // Best dishes / recommendations
    if (msg.match(/mejor plato|mejores platos|recomiend|recomienda|qué pedido|que pedido|qué pido|que pido|top|favorito|impresionar/)) {
      return '⭐ NUESTROS PLATOS ESTRELLA:\n\n🥪 Bikini da Terra (10,50€)\nSándwich brioche con gambones\n\n🥫 Mejillones en Escabeche (17,50€)\nConserva de autor gallega\n\n🥧 Empanada de Compango (9,90€)\nClásica empanada gallega\n\n🍞 Tostas de la Casa (7,90€)\nPerfectas para tapear\n\n¡Estos son los más pedidos!'
    }
    
    // Recommendations
    if (msg.match(/recomendación|recomendacion|sugerencia|consejo|qué me aconsejas/)) {
      return '💡 MIS RECOMENDACIONES:\n\nPara empezar: Mejillones en Escabeche o Bikini da Terra\n\nDe principal: Pulpo Rockero o Cachopo\n\nPara beber: Una 1906 bien fría\n\nDe postre: Tarta Santiago Coulant\n\n¡Tienes que probar el pulpo, es nuestra estrella!'
    }
    
    // Greetings
    if (msg.match(/^(hola|buenas|buenos|hey|hi|hello|qué tal|como estás|cómo estás)/)) {
      return '¡Hola! 👋 Bienvenido a A Rúa. Pregúntame lo que quieras: carta, reservas, horarios, recomendaciones...'
    }
    
    // Hours
    if (msg.match(/hora|horario|abierto|cerrado|cuando|cuándo/)) {
      return '🕐 HORARIO:\n\nAbrimos TODOS los días\n09:00 a 00:00\n\nNo hace falta reservar, pero si quieres asegurar mesa, llama al 911 66 16 41.'
    }
    
    // Location
    if (msg.match(/direccion|dirección|donde|dónde|ubicacion|ubicación|llegar|estáis/)) {
      return '📍 UBICACIÓN:\n\nC. del Príncipe Carlos, 50\nHortaleza, 28050 Madrid\n\n🚇 Metro: Línea 4 (San Lorenzo)\n🚌 Bus: 9, 52, 73\n\n¡Te esperamos!'
    }
    
    // Phone
    if (msg.match(/telefono|teléfono|llamar|contacto|número/)) {
      return '📞 TELÉFONO:\n\n911 66 16 41\n\nTambién WhatsApp en el mismo número.'
    }
    
    // Reservations
    if (msg.match(/reserv|mesa|book/)) {
      return '📅 RESERVAS:\n\n📞 Llama: 911 66 16 41\n💬 WhatsApp: mismo número\n\nPara grupos grandes (+10), reserva con antelación.'
    }
    
    // Menu
    if (msg.match(/menu|menú|carta|plato|comida|comer|tapear|tiene|tenéis/)) {
      return '🍽️ NUESTRA CARTA:\n\n🥫 Conservas de autor\n🍳 Croquetas caseras\n🍗 Cos Dedos (para chuparte los dedos)\n🥘 Barriga Llena (principales)\n🍰 Postres caseros\n🍻 Cervezas y vinos\n\n¿Te cuento algún plato en concreto?'
    }
    
    // Specialties
    if (msg.match(/especialidad|típico|tipico|famoso|popular|destacado/)) {
      return '⭐ ESPECIALIDADES:\n\n🐙 Pulpo Rockero (26,50€)\n🥘 Callos a la Gallega (12,70€)\n🥩 Cachopo Tradicional (25,50€)\n🦐 Gambones en Costra (16,90€)\n\n¡Nuestro pulpo es el más pedido!'
    }
    
    // Octopus
    if (msg.match(/pulpo|octopus/)) {
      return '🐙 PULPO ROCKERO - 26,50€\n\n"El pulpino con solo de guitarra eléctrica"\n\nTierno, braseado a la perfección con aceite de ajo y pimentón. Con una chispa que te hará vibrar.\n\n¡Es nuestro plato estrella!'
    }
    
    // Callos
    if (msg.match(/callo|callos/)) {
      return '🍲 CALLOS A LA GALLEGA - 12,70€\n\n"Más gallegos que una gaita en la plaza del Obradoiro"\n\nCocinados lentamente con la receta tradicional. ¡Un clásico!'
    }
    
    // Cachopo
    if (msg.match(/cachopo/)) {
      return '🥩 CACHOPO TRADICIONAL - 25,50€\n\n"Un señor cachopo que sabe a Asturias"\n\nDos filetes de ternera rellenos de jamón ibérico y queso, empanados y fritos a la perfección. ¡Espectacular!'
    }
    
    // Gambones
    if (msg.match(/gambón|gambon|langostino|camarón/)) {
      return '🦐 GAMBONES EN COSTRA - 16,90€\n\nJugosos y ahumados en horno de carbón, en costra de pimentón, y bañados en una mayonesa que sabe a océano.\n\n¡Increíbles!'
    }
    
    // Oreja
    if (msg.match(/oreja|orejas/)) {
      return '🍖 OREJA EN TÉMPURA CON BRAVA - 12,00€\n\nCrujiente, jugosita y en una brava que no se anda con tintas.\n\n¡Un clásico que tienes que probar!'
    }
    
    // Hummus
    if (msg.match(/hummus|garbanzo/)) {
      return '🥣 HUMMUS DE GARBANZO - 7,50€\n\nCremoso, suave y con los mejores toppings caseros que vas a probar.\n\n¡Perfecto para compartir!'
    }
    
    // Bikini da Terra
    if (msg.match(/bikini|sándwich|sandwich|brioche/)) {
      return '🥪 BIKINI DA TERRA - 10,50€\n\nSándwich de brioche con gambones, queso fundido, lechuga fresca y nuestra mayonesa especial del mar.\n\n¡Uno de nuestros Cos Dedos más pedidos!'
    }
    
    // Mejillones
    if (msg.match(/mejillón|mejillon|mejillones/)) {
      return '🥫 MEJILLONES EN ESCABECHE - 17,50€\n\nConserva de autor con mejillones de las Rías Gallegas en su tradicional salsa de escabeche.\n\n¡Un clásico gallego que no puedes perderte!'
    }
    
    // Empanada
    if (msg.match(/empanada|empanadilla/)) {
      return '🥧 EMPANADA DE COMPANGO - 9,90€\n\nLa clásica empanada gallega con su relleno tradicional de carne.\n\n¡Perfecta para compartir!'
    }
    
    // Tostas
    if (msg.match(/tosta|tostada|pan tostado/)) {
      return '🍞 TOSTAS DE LA CASA - 7,90€\n\nPan tostado crujiente con nuestros toppings especiales.\n\n¡Ideal para tapear con una buena cerveza!'
    }
    
    // Prices
    if (msg.match(/precio|cuanto|cuánto|barato|caro|costar|cuesta|económico/)) {
      return '💰 PRECIOS:\n\n• Tapas: desde 7,50€\n• Principales: 9€ - 27€\n• Postres: 6,90€ - 7,50€\n• Cervezas: desde 3,60€\n• Vinos: desde 15€/botella\n\nBuena calidad a buen precio.'
    }
    
    // WhatsApp
    if (msg.match(/whatsapp|wasap|whats/)) {
      return '📱 WHATSAPP:\n\n911 66 16 41\n\nEscríbenos para reservas o cualquier duda.'
    }
    
    // Instagram
    if (msg.match(/instagram|redes|social|follow/)) {
      return '📸 INSTAGRAM:\n\n@arua.restaurante\n\nSíguenos para ver novedades y fotos de nuestros platos.'
    }
    
    // Parking
    if (msg.match(/parking|aparcar|coche|vehiculo/)) {
      return '🚗 PARKING:\n\n• Zona azul en la calle (pago)\n• Parkings públicos cercanos\n• Calles aledañas gratis\n\nLlega 10-15 min antes para aparcar tranquilo.'
    }
    
    // Children
    if (msg.match(/niño|niños|familiar|familia|hijo/)) {
      return '👨‍👩‍👧‍👦 FAMILIAS:\n\n✓ Tronas disponibles\n✓ Menú infantil\n✓ Ambiente acogedor\n\n¡Ven con toda la familia!'
    }
    
    // Vegetarian
    if (msg.match(/vegetariano|vegano|verdura/)) {
      return '🥗 VEGETARIANO:\n\n• Verduras asadas trufadas (7,90€)\n• Hummus con toppings (7,50€)\n• Tortilla clásica o trufada\n\nConsulta con el camarero.'
    }
    
    // Allergies
    if (msg.match(/alerg|gluten|celiac/)) {
      return '⚠️ ALERGIAS:\n\n✓ Carta con alérgenos\n✓ Opciones sin gluten\n✓ Cerveza sin gluten\n\nInforma siempre a tu camarero.'
    }
    
    // Groups
    if (msg.match(/grupo|evento|celebracion|fiesta|cumple/)) {
      return '🎉 GRUPOS:\n\nHasta 20 personas: sin problema.\nMás de 20: llama antes al 911 66 16 41.\n\n¿Qué celebras?'
    }
    
    // Thanks
    if (msg.match(/gracias|genial|perfecto|excelente|ok|vale/)) {
      return '😊 ¡De nada! Cualquier otra cosa, pregunta. ¡Te esperamos en A Rúa!'
    }
    
    // Payment
    if (msg.match(/pago|pagar|tarjeta|efectivo|bizum/)) {
      return '💳 PAGO:\n\n✓ Efectivo\n✓ Tarjetas (Visa, Mastercard)\n✓ Bizum\n✓ Apple/Google Pay'
    }
    
    // Terrace
    if (msg.match(/terraza|exterior|aire libre/)) {
      return '🌿 TERRAZA:\n\nSí, tenemos terraza exterior. Pídela al reservar.'
    }
    
    // Dogs
    if (msg.match(/perro|mascota|pet/)) {
      return '🐕 MASCOTAS:\n\nPerros en terraza. Para el interior, consulta antes.'
    }
    
    // Download
    if (msg.match(/descargar|download|pdf/)) {
      return '📋 Descarga la carta completa en la sección "Carta" de la web.'
    }
    
    // What is A Rúa
    if (msg.match(/qué es|que es|quién|quien|sobre|información/)) {
      return '🍽️ A RÚA RESTAURANTE:\n\n"Un trocito de Galicia en Madrid"\n\nRestaurante Gallego y Canalla en Hortaleza. Cocina de la costa noroeste con un punto canalla.\n\n📍 C. del Príncipe Carlos, 50\n📞 911 66 16 41\n🕐 Todos los días 09:00-00:00'
    }
    
    // Default
    return '🤔 No te he entendido bien.\n\nPuedo ayudarte con:\n• Horarios y ubicación\n• Reservas\n• Carta y recomendaciones\n• Cervezas y vinos\n• Precios\n\n¿Qué necesitas?'
  }

  const handleSend = () => {
    const message = inputValue.trim()
    if (!message) return
    
    setMessages(prev => [...prev, { role: 'user', text: message }])
    setInputValue('')
    setIsTyping(true)
    
    setTimeout(() => {
      const response = getResponse(message)
      setMessages(prev => [...prev, { role: 'bot', text: response }])
      setIsTyping(false)
    }, 600 + Math.random() * 600)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[100] w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
        style={{ background: isOpen ? '#1a1a1a' : '#c9a227', boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 25px rgba(201, 162, 39, 0.5)' }}
        aria-label="Chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      <div 
        className={`fixed z-[95] transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        style={{ bottom: '80px', right: '16px', width: 'calc(100vw - 32px)', maxWidth: '400px' }}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)', border: '1px solid rgba(201, 162, 39, 0.3)' }}>
          <div className="p-3 sm:p-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #c9a227 0%, #a88a1f 100%)' }}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <span className="text-xl sm:text-2xl">🍽️</span>
            </div>
            <div>
              <h3 className="font-bold text-black text-base sm:text-lg">A Rúa</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                <span className="text-xs text-black/70">En línea</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 space-y-3" style={{ background: 'linear-gradient(180deg, #141414 0%, #0a0a0a 100%)' }}>
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                  style={{ background: msg.role === 'user' ? 'linear-gradient(135deg, #c9a227 0%, #b8941f 100%)' : 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)', border: msg.role === 'bot' ? '1px solid #3a3a3a' : 'none' }}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed" style={{ color: msg.role === 'user' ? '#000' : '#fff' }}>{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 rounded-bl-sm" style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)', border: '1px solid #3a3a3a' }}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#c9a227] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-[#c9a227] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-[#c9a227] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length <= 2 && (
            <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-2">
              {['Horarios', 'Ubicación', 'Recomiendame', 'Mejores platos'].map((q, i) => (
                <button key={i} onClick={() => { setInputValue(q); setTimeout(() => handleSend(), 50) }} className="text-xs px-3 py-1.5 rounded-full border border-[#c9a227]/30 text-[#c9a227] hover:bg-[#c9a227]/10 transition-colors">{q}</button>
              ))}
            </div>
          )}
          
          <div className="p-3 border-t" style={{ borderColor: '#2a2a2a', background: '#0d0d0d' }}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-full px-4 py-2.5 sm:py-3 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#c9a227]"
              />
              <button onClick={handleSend} disabled={!inputValue.trim()} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${inputValue.trim() ? 'bg-[#c9a227] hover:bg-[#b8941f]' : 'bg-[#2a2a2a] cursor-not-allowed'}`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ============================================================================
// NAVIGATION
// ============================================================================
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#destacados', label: 'Destacados' },
    { href: '#carta', label: 'Carta' },
    { href: '#galeria', label: 'Galería' },
    { href: '#reservas', label: 'Reservas' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${scrolled ? 'py-2 sm:py-3' : 'py-4 sm:py-5'}`}
      style={{ background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(201,162,39,0.1)' : 'none' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#inicio">
          <img src="https://aruarestaurantes.com/wp-content/uploads/2025/07/logoo.png" alt="A Rúa" className="h-10 sm:h-12 lg:h-14 w-auto" />
        </a>
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-xs xl:text-sm tracking-[0.15em] uppercase text-[#a0a0a0] hover:text-[#c9a227] transition-colors">{link.label}</a>
          ))}
        </div>
        <a href="#reservas" className="hidden lg:inline-block px-5 xl:px-6 py-2.5 xl:py-3 bg-[#c9a227] text-black font-semibold text-xs xl:text-sm uppercase tracking-wider rounded hover:bg-[#e3c453] transition-all">Reservar</a>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-lg">
          <span className={`w-5 sm:w-6 h-0.5 bg-[#c9a227] transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2 sm:translate-y-2.5' : ''}`} />
          <span className={`w-5 sm:w-6 h-0.5 bg-[#c9a227] transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 sm:w-6 h-0.5 bg-[#c9a227] transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2 sm:-translate-y-2.5' : ''}`} />
        </button>
      </div>
      <div className={`lg:hidden fixed inset-0 top-[56px] sm:top-[68px] transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(20px)' }}>
        <div className="flex flex-col items-center justify-center h-full gap-1 p-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-xl sm:text-2xl font-medium text-white hover:text-[#c9a227] transition-colors py-3 sm:py-4 px-6 w-full text-center">{link.label}</a>
          ))}
          <a href="#reservas" onClick={() => setMobileMenuOpen(false)} className="mt-4 sm:mt-6 px-8 sm:px-10 py-3 sm:py-4 bg-[#c9a227] text-black font-semibold text-base sm:text-lg uppercase tracking-wider rounded">Reservar Mesa</a>
        </div>
      </div>
    </nav>
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const images = ['/download/IMG_1541.jpeg', '/download/IMG_1542.jpeg', '/download/IMG_1543.jpeg', '/download/IMG_1544.jpeg']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 1 : 0 }}
        >
          <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${img})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-24 sm:bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${i === currentSlide ? 'bg-[#c9a227] w-6 sm:w-8' : 'bg-white/30'}`} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <span className="text-[#c9a227] text-3xl sm:text-4xl">✦</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-wider">
          <span className="bg-gradient-to-r from-[#c9a227] via-[#e3c453] to-[#c9a227] bg-clip-text text-transparent">A RÚA</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-[#e0e0e0] mb-3 sm:mb-4 font-light tracking-wide">Restaurante Gallego y Canalla</p>
        <p className="text-base sm:text-lg text-[#b0b0b0] mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
          Un trocito de Galicia en Madrid. Comida de la costa noroeste con un punto canalla.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <a href="#destacados" className="px-8 sm:px-10 py-3 sm:py-4 bg-[#c9a227] text-black font-semibold text-sm uppercase tracking-wider rounded hover:bg-[#e3c453] transition-all">Ver Destacados</a>
          <a href="tel:+34911661641" className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-[#c9a227] text-[#c9a227] font-semibold text-sm uppercase tracking-wider rounded hover:bg-[#c9a227] hover:text-black transition-all flex items-center justify-center gap-2">
            <span>📞</span> 911 66 16 41
          </a>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2">
        <span className="text-[#909090] text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-[#c9a227]/50 rounded-full flex justify-center pt-1.5 sm:pt-2">
          <div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-[#c9a227] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FEATURED DISHES SECTION
// ============================================================================
function FeaturedDishes() {
  const dishes = [
    { image: '/download/IMG_2002.jpeg', name: 'PULPO ROCKERO', desc: 'El pulpino, pero con un solo de guitarra eléctrica. Tierno, braseado y con una chispa que te hará vibrar.' },
    { image: '/download/IMG_2003.jpeg', name: 'HUMMUS DE GARBANZO CON TOPPINGS CASEROS', desc: 'Cremoso, suave y con los mejores toppings que vas a probar.' },
    { image: '/download/IMG_2004.png', name: 'OREJA EN TÉMPURA CON BRAVA', desc: 'Crujiente, jugosita y en una brava que no se anda con tintas.' },
    { image: '/download/IMG_2005.jpeg', name: 'GAMBONES EN COSTRA DE PIMENTÓN CON MAYONESA DEL MAR', desc: 'Jugosos y ahumados en horno de carbón, en costra de pimiento, y bañados en una mayonesa que sabe a océano.' },
  ]

  return (
    <section id="destacados" className="py-16 sm:py-24 lg:py-32 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[#c9a227] tracking-[0.2em] uppercase text-xs sm:text-sm font-medium">Nuestra Selección</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#c9a227] via-[#e3c453] to-[#c9a227] bg-clip-text text-transparent">Platos Destacados</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dishes.map((dish, index) => (
            <div key={index} className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#141414] border border-[#2a2a2a] hover:border-[#c9a227]/50 transition-all duration-300">
              <div className="aspect-square overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5">
                <h3 className="text-white font-semibold text-sm sm:text-base mb-1 leading-tight">{dish.name}</h3>
                <p className="text-[#b0b0b0] text-xs sm:text-sm leading-relaxed">{dish.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <a href="#carta" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#c9a227] text-black font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-lg hover:bg-[#e3c453] transition-all">
            Ver Carta Completa
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// ABOUT SECTION
// ============================================================================
function AboutSection() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const videos = ['/download/video1.mp4', '/download/video2.mp4', '/download/video3.mp4']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [videos.length])

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="relative group order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
              <div className="aspect-[9/16] sm:aspect-[4/3] lg:aspect-[4/3] w-full">
                {videos.map((video, index) => (
                  <video
                    key={index}
                    src={video}
                    className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-opacity duration-1000 ${index === currentVideo ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20" />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {videos.map((_, i) => (
                <button key={i} onClick={() => setCurrentVideo(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentVideo ? 'bg-[#c9a227] scale-125' : 'bg-white/50 hover:bg-white/70'}`} />
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[#c9a227] tracking-[0.2em] uppercase text-xs sm:text-sm font-medium">Nuestra Historia</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-[#c9a227] via-[#e3c453] to-[#c9a227] bg-clip-text text-transparent">Un Trocito de Galicia</span>
              <br />
              <span className="text-white">en Madrid</span>
            </h2>
            <div className="space-y-4 sm:space-y-6 text-[#c0c0c0] text-base sm:text-lg leading-relaxed">
              <p>
                En pleno <strong className="text-white">Sanchinarro</strong> disfruta de la mejor comida gallega con fusión para una experiencia gastronómica que mezcla la cocina gallega clásica con mezclas modernas y sorprendentes que no deja indiferente a nadie.
              </p>
              <p>
                Traemos un trocito de <strong className="text-[#c9a227]">Galicia a Madrid</strong> para degustar la mejor Estrella Galicia junto a una ración de orejas o pulpo.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
              {[
                { icon: '🍷', title: 'Vinos Gallegos' },
                { icon: '🦐', title: 'Marisco Fresco' },
                { icon: '👨‍🍳', title: 'Cocina Tradicional' },
                { icon: '✨', title: 'Ambiente Único' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">{f.icon}</span>
                  <span className="text-white font-medium text-sm sm:text-base">{f.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MENU DATA
// ============================================================================
const menuData: Record<string, { title: string; subtitle?: string; items: Array<{ name: string; desc?: string; price: string }> }> = {
  conservas: {
    title: 'A RÚA EN LATA',
    subtitle: 'Conservas de Autor',
    items: [
      { name: 'Volanderas Ajo y Guindilla', price: '11,00€' },
      { name: 'Volanderas en Salsa de Vieira', price: '11,00€' },
      { name: 'Navajas al Natural', price: '12,50€' },
      { name: 'Navajas Ajo y Guindilla', price: '13,90€' },
      { name: 'Mejillones en Escabeche', price: '17,50€' },
      { name: 'Mejillones Picantes', price: '12,50€' },
    ],
  },
  croquetas: {
    title: 'CROQUETAS',
    subtitle: 'Caseras y Deliciosas',
    items: [
      { name: 'Jamón', desc: 'Clásica pero matona', price: '10,50€' },
      { name: 'Membrillo y Jalapeños', desc: 'Dulce y picante', price: '10,50€' },
      { name: 'Carne', desc: 'Pecadora y exquisita', price: '12,50€' },
      { name: 'Combo (2 de cada)', desc: 'Para probar todo', price: '12,00€' },
    ],
  },
  dedos: {
    title: 'COS DEDOS',
    subtitle: 'Para Chuparte los Dedos',
    items: [
      { name: 'Alitas de Pollo de Muxía', desc: 'Suavepicantes', price: '8,50€' },
      { name: 'Bikini da Terra', desc: 'Brioche con gambones', price: '10,50€' },
      { name: 'Empanada de Compango', desc: 'Clásico gallego', price: '9,90€' },
      { name: 'Burger da Rúa', desc: 'Carne gallega', price: '15,00€' },
      { name: 'Tacos de Codillo', desc: 'Con orujo de café', price: '15,90€' },
      { name: 'Costillas Barbacoa Koreana', desc: 'Ahumadas', price: '16,90€' },
    ],
  },
  barriga: {
    title: 'BARRIGA LLENA',
    subtitle: 'Platos Principales',
    items: [
      { name: 'Pulpo Rockero', desc: 'Tierno con chispa especial', price: '26,50€' },
      { name: 'Callos a la Gallega', desc: 'Tradición pura', price: '12,70€' },
      { name: 'Gambones en Costra', desc: 'Ahumados al carbón', price: '16,90€' },
      { name: 'Tabla de Quesos', desc: 'San Simón, Arzúa...', price: '22,90€' },
      { name: 'Ensaladilla de Gamba', desc: 'La que manda', price: '9,50€' },
      { name: 'Dúo Salmón y Atún', desc: 'Marinado cítrico', price: '15,00€' },
      { name: 'Fritura de Pulpitos', desc: 'Crujiente', price: '9,90€' },
      { name: 'Gyozas de Pollo', desc: 'Galicia-Asia', price: '8,50€' },
      { name: 'Verduras Asadas', desc: 'Aceite trufado', price: '7,90€' },
      { name: 'Hummus Casero', desc: 'Con toppings', price: '7,50€' },
      { name: 'Patatas Cheese-Meat', desc: 'San Simón, baconesa', price: '12,90€' },
      { name: 'Tortilla Clásica', desc: 'Jugosa y perfecta', price: '12,00€' },
      { name: 'Tortilla Trufa', desc: 'Premium', price: '13,00€' },
      { name: 'Oreja en Témpura', desc: 'Con brava', price: '12,00€' },
      { name: 'Huevos Rotos con Zorza', price: '13,00€' },
      { name: 'Albóndigas Gallegas', desc: 'Parmentier funghi', price: '9,90€' },
      { name: 'Cachopo Tradicional', desc: 'Jamón y queso', price: '25,50€' },
      { name: 'Chuletón', desc: 'Mín. 2 personas', price: '59€/KG' },
    ],
  },
  golosos: {
    title: 'POSTRES',
    subtitle: 'Os Golosos',
    items: [
      { name: 'Tarta Santiago Coulant', desc: 'Con helado vainilla', price: '6,90€' },
      { name: 'Gofre Baileys', desc: 'Helado caramelo salado', price: '7,50€' },
      { name: 'Torrija', desc: 'Helado de canela', price: '6,90€' },
    ],
  },
  cervezas: {
    title: 'CERVEZAS',
    items: [
      { name: 'Copa Estrella Galicia', price: '3,60€' },
      { name: 'Jarra Estrella Galicia', price: '4,60€' },
      { name: 'Tercio Estrella Galicia', price: '3,60€' },
      { name: 'Copa 1906', price: '4,10€' },
      { name: 'Jarra 1906', price: '5,10€' },
      { name: 'Tercio 0\'0 Tostada', price: '3,80€' },
      { name: 'Tercio Red Vintage', price: '4,80€' },
      { name: 'Tercio Sin Gluten', price: '3,60€' },
    ],
  },
  vinos: {
    title: 'VINOS',
    subtitle: 'Blancos y Tintos',
    items: [
      { name: 'Blanco de la Casa', desc: 'Sin DO', price: '3,10€ / 15€' },
      { name: 'Anduva', desc: 'Rueda', price: '3,10€ / 15€' },
      { name: 'Val do Sosego', desc: 'Rías Baixas', price: '22,00€' },
      { name: 'Loeda', desc: 'Ribeiro', price: '3,30€ / 17€' },
      { name: 'Mozafesca', desc: 'Godello', price: '3,50€ / 17€' },
      { name: 'Devoción Crianza', desc: 'Rioja', price: '3,10€ / 15€' },
      { name: 'Arraigo Roble', desc: 'Ribera D.O', price: '3,30€ / 16€' },
      { name: 'Mencía de la Casa', price: '3,10€ / 15€' },
      { name: 'Protos Crianza', desc: 'Ribera D.O', price: '35,00€' },
      { name: 'Luis Cañas Crianza', desc: 'Rioja', price: '29,50€' },
      { name: 'Valdouro 12 Meses', desc: 'Mencía', price: '17,50€' },
    ],
  },
  tragos: {
    title: 'TRAGOS',
    subtitle: 'Cócteles con Carácter',
    items: [
      { name: 'Solpor Vermello', desc: 'Aperol, berry, naranja', price: '7,90€ / 4,50€' },
      { name: 'Limóns de Primavera', desc: 'Vermut y limón', price: '7,90€ / 4,50€' },
      { name: 'Meigallo Branco', desc: 'Petroni, jengibre', price: '8,50€ / 4,90€' },
      { name: 'Mula Meiga', desc: 'Orujo, ginger beer', price: '8,90€ / 5,00€' },
      { name: 'Nordés do Mar', desc: 'Gin-tonic elegante', price: '9,50€ / 5,50€' },
      { name: 'A Pombiña Brava', desc: 'Tequila, pomelo', price: '7,90€ / 4,50€' },
      { name: 'Sol do Caribe', desc: 'Ron, mango, naranja', price: '8,50€ / 4,90€' },
      { name: 'Sen Pecado', desc: 'Sin alcohol', price: '5,50€ / 3,00€' },
    ],
  },
}

// ============================================================================
// MENU SECTION
// ============================================================================
function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('conservas')
  const categories = [
    { id: 'conservas', name: 'Conservas' },
    { id: 'croquetas', name: 'Croquetas' },
    { id: 'dedos', name: 'Cos Dedos' },
    { id: 'barriga', name: 'Principales' },
    { id: 'golosos', name: 'Postres' },
    { id: 'cervezas', name: 'Cervezas' },
    { id: 'vinos', name: 'Vinos' },
    { id: 'tragos', name: 'Tragos' },
  ]
  const currentCategory = menuData[activeCategory]

  const downloadMenu = () => {
    const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>A Rúa - Carta</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Montserrat,sans-serif;background:#0a0a0a;color:#fff;padding:40px}.container{max-width:800px;margin:0 auto}.header{text-align:center;margin-bottom:40px;padding-bottom:30px;border-bottom:2px solid #c9a227}.logo{width:100px;margin:0 auto 20px}.logo img{width:100%}.title{font-size:36px;background:linear-gradient(135deg,#c9a227,#e3c453);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.info{color:#707070;font-size:12px;margin-top:15px}.section{margin-bottom:30px}.section-title{font-size:20px;color:#c9a227;margin-bottom:15px;border-bottom:1px solid #c9a227;padding-bottom:5px}.item{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1a1a1a}.item-name{font-weight:600}.item-price{color:#c9a227;font-weight:700}.footer{text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;color:#505050;font-size:11px}</style></head><body><div class="container"><div class="header"><div class="logo"><img src="https://aruarestaurantes.com/wp-content/uploads/2025/07/logoo.png" alt="A Rúa"></div><div class="title">A RÚA</div><div class="info">C. del Príncipe Carlos, 50, Hortaleza, Madrid | 911 66 16 41</div></div>${Object.entries(menuData).map(([k,s])=>`<div class="section"><div class="section-title">${s.title}</div>${s.items.map(i=>`<div class="item"><div><div class="item-name">${i.name}</div>${i.desc?`<div style="color:#707070;font-size:11px">${i.desc}</div>`:''}</div><div class="item-price">${i.price}</div></div>`).join('')}</div>`).join('')}<div class="footer">© A Rúa Restaurante - Grupo Do Meigo</div></div></body></html>`
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'A-Rua-Carta.html'
    a.click()
    window.open(url, '_blank')
  }

  return (
    <section id="carta" className="py-16 sm:py-24 lg:py-32 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[#c9a227] tracking-[0.2em] uppercase text-xs sm:text-sm">Sabores Auténticos</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#c9a227] via-[#e3c453] to-[#c9a227] bg-clip-text text-transparent">Nuestra Carta</span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm uppercase tracking-wider font-medium transition-all rounded-lg ${activeCategory === c.id ? 'bg-[#c9a227] text-black' : 'bg-[#1a1a1a] text-[#a0a0a0] hover:text-[#c9a227] border border-[#2a2a2a]'}`}>{c.name}</button>
          ))}
        </div>
        {currentCategory.subtitle && <p className="text-[#c9a227] text-center text-sm sm:text-base tracking-wider uppercase mb-6 sm:mb-8">{currentCategory.subtitle}</p>}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {currentCategory.items.map((item, i) => (
            <div key={i} className="group bg-gradient-to-br from-[#141414] to-[#0d0d0d] rounded-lg sm:rounded-xl p-4 sm:p-5 border border-[#1a1a1a] hover:border-[#c9a227]/50 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#c9a227] transition-colors mb-1">{item.name}</h3>
                  {item.desc && <p className="text-[#909090] text-xs sm:text-sm">{item.desc}</p>}
                </div>
                <span className="text-[#c9a227] font-bold text-base sm:text-lg whitespace-nowrap">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 sm:mt-12">
          <button onClick={downloadMenu} className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#c9a227] text-black font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-lg hover:bg-[#e3c453] transition-all">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Descargar Carta
          </button>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// GALLERY
// ============================================================================
function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const c = scrollRef.current
    if (!c || isPaused) return
    let id: number, pos = 0
    const animate = () => { pos += 0.4; if (pos >= c.scrollWidth / 2) pos = 0; c.scrollLeft = pos; id = requestAnimationFrame(animate) }
    id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [isPaused])

  const images = [
    { src: '/download/IMG_1537.jpeg', title: 'A Rúa' },
    { src: '/download/IMG_1538.jpeg', title: 'Ambiente' },
    { src: '/download/IMG_1539.jpeg', title: 'Gastronomía' },
    { src: '/download/IMG_1540.jpeg', title: 'Cocina' },
    { src: '/download/IMG_1541.jpeg', title: 'Sala' },
    { src: '/download/IMG_1542.jpeg', title: 'Detalles' },
    { src: '/download/IMG_1543.jpeg', title: 'Platos' },
    { src: '/download/IMG_1544.jpeg', title: 'Noches' },
    { src: '/download/IMG_1545.jpeg', title: 'Momentos' },
    { src: '/download/IMG_1546.jpeg', title: 'A Rúa' },
  ]

  return (
    <section id="galeria" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-[#050505]">
      <div className="text-center mb-10 sm:mb-16 px-4 sm:px-6">
        <span className="text-[#c9a227] tracking-[0.2em] uppercase text-xs sm:text-sm">Momentos Únicos</span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-[#c9a227] via-[#e3c453] to-[#c9a227] bg-clip-text text-transparent">Galería</span>
        </h2>
      </div>
      <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-hidden px-4 sm:px-6" style={{ scrollbarWidth: 'none' }}>
          {[...images, ...images].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-64 sm:w-72 lg:w-80 h-72 sm:h-80 lg:h-96 relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                <span className="text-white text-base sm:text-lg font-medium">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-40 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-40 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />
      </div>
      <div className="text-center mt-10 sm:mt-16">
        <a href="https://www.instagram.com/arua.restaurante/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 sm:gap-3 text-[#a0a0a0] hover:text-[#c9a227] transition-colors">
          <span className="text-xl sm:text-2xl">📸</span>
          <span className="text-xs sm:text-sm uppercase tracking-wider">@arua.restaurante</span>
        </a>
      </div>
    </section>
  )
}

// ============================================================================
// RESERVATION SECTION
// ============================================================================
function ReservationSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    const msg = `¡Hola! Quiero hacer una reserva:\n📅 Fecha: ${formData.date}\n🕐 Hora: ${formData.time}\n👥 Personas: ${formData.guests}\n👤 Nombre: ${formData.name}\n📱 Teléfono: ${formData.phone}${formData.message ? `\n💬 ${formData.message}` : ''}`
    window.open(`https://wa.me/34911661641?text=${encodeURIComponent(msg)}`, '_blank')
    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' }) }, 5000)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="reservas" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/download/IMG_1541.jpeg)' }} />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[#c9a227] tracking-[0.2em] uppercase text-xs sm:text-sm">Reserva tu Mesa</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#c9a227] via-[#e3c453] to-[#c9a227] bg-clip-text text-transparent">Hacer Reserva</span>
          </h2>
          <p className="text-[#b0b0b0] max-w-2xl mx-auto text-sm sm:text-base px-4">
            Un trocito de Galicia en Madrid. En pleno Sanchinarro disfruta de la mejor comida gallega. Traemos un trocito de Galicia a Madrid para degustar la mejor Estrella Galicia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {[
            { icon: '📍', text: 'C. del Príncipe Carlos, 50', sub: 'Hortaleza, Madrid' },
            { icon: '📞', text: '911 66 16 41', sub: 'Llama o WhatsApp' },
            { icon: '🕐', text: '09:00 - 00:00', sub: 'Todos los días' },
          ].map((item, i) => (
            <div key={i} className="bg-[#1a1a1a]/80 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-5 text-center border border-[#2a2a2a]">
              <span className="text-2xl sm:text-3xl">{item.icon}</span>
              <p className="text-white font-semibold mt-1.5 sm:mt-2 text-sm sm:text-base">{item.text}</p>
              <p className="text-[#909090] text-xs sm:text-sm">{item.sub}</p>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bg-[#1a1a1a]/90 backdrop-blur rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border border-[#c9a227]/30">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#c9a227] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#c9a227] mb-3 sm:mb-4">¡Reserva Enviada!</h3>
            <p className="text-[#b0b0b0] text-sm sm:text-base">Se ha abierto WhatsApp. ¡Envía el mensaje!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#1a1a1a]/90 backdrop-blur rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-[#2a2a2a]">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-[#b0b0b0] uppercase tracking-wider mb-1.5 sm:mb-2"><span className="text-[#c9a227]">👤</span> Nombre *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#3a3a3a] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-[#505050] focus:outline-none focus:border-[#c9a227]" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-[#b0b0b0] uppercase tracking-wider mb-1.5 sm:mb-2"><span className="text-[#c9a227]">📧</span> Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#3a3a3a] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-[#505050] focus:outline-none focus:border-[#c9a227]" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-[#b0b0b0] uppercase tracking-wider mb-1.5 sm:mb-2"><span className="text-[#c9a227]">📱</span> Teléfono *</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#3a3a3a] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-[#505050] focus:outline-none focus:border-[#c9a227]" placeholder="+34 600 000 000" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-[#b0b0b0] uppercase tracking-wider mb-1.5 sm:mb-2"><span className="text-[#c9a227]">👥</span> Comensales *</label>
                <select required value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#3a3a3a] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#c9a227]">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} persona{n>1?'s':''}</option>)}
                  <option value="10+">Más de 10</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-[#b0b0b0] uppercase tracking-wider mb-1.5 sm:mb-2"><span className="text-[#c9a227]">📅</span> Fecha *</label>
                <input type="date" required min={today} value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#3a3a3a] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#c9a227]" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-[#b0b0b0] uppercase tracking-wider mb-1.5 sm:mb-2"><span className="text-[#c9a227]">🕐</span> Hora *</label>
                <select required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#3a3a3a] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-[#c9a227]">
                  <option value="">Seleccionar hora</option>
                  {['13:00','13:30','14:00','14:30','15:00','15:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4 sm:mt-6">
              <label className="flex items-center gap-2 text-xs sm:text-sm text-[#b0b0b0] uppercase tracking-wider mb-1.5 sm:mb-2"><span className="text-[#c9a227]">💬</span> Comentarios</label>
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={2} className="w-full bg-[#0a0a0a] border border-[#3a3a3a] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base placeholder-[#505050] focus:outline-none focus:border-[#c9a227] resize-none" placeholder="Alergias, celebraciones..." />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full mt-6 sm:mt-8 py-3 sm:py-4 bg-[#c9a227] text-black font-semibold text-sm sm:text-base uppercase tracking-wider rounded-lg hover:bg-[#e3c453] transition-all flex items-center justify-center gap-2 disabled:opacity-70">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 sm:h-5 w-4 sm:w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Enviando...
                </>
              ) : '📱 Reservar por WhatsApp'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ============================================================================
// CONTACT
// ============================================================================
function ContactSection() {
  return (
    <section id="contacto" className="py-16 sm:py-24 lg:py-32 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[#c9a227] tracking-[0.2em] uppercase text-xs sm:text-sm">Encuéntranos</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#c9a227] via-[#e3c453] to-[#c9a227] bg-clip-text text-transparent">Contacto</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[450px] border border-[#2a2a2a]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.2234!2d-3.6652!3d40.4923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228c0a0e0a0a1%3A0x0!2sC.%20del%20Pr%C3%ADncipe%20Carlos%2C%2050%2C%2028050%20Madrid!5e0!3m2!1ses!2ses" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
          </div>
          <div className="space-y-6 sm:space-y-8">
            {[
              { icon: '📍', title: 'Dirección', text: 'C. del Príncipe Carlos, 50', sub: 'Hortaleza, 28050 Madrid' },
              { icon: '📞', title: 'Teléfono', text: '911 66 16 41', link: 'tel:+34911661641' },
              { icon: '🕐', title: 'Horario', text: 'Todos los días', sub: '09:00 - 00:00' },
              { icon: '📸', title: 'Instagram', text: '@arua.restaurante', link: 'https://www.instagram.com/arua.restaurante/' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0 border border-[#c9a227]/20">
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-0.5 sm:mb-1">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[#c9a227] hover:text-[#e3c453] transition-colors text-sm sm:text-lg">{item.text}</a>
                  ) : (
                    <p className="text-[#b0b0b0] text-sm sm:text-lg">{item.text}</p>
                  )}
                  {item.sub && <p className="text-[#909090] text-xs sm:text-sm mt-0.5">{item.sub}</p>}
                </div>
              </div>
            ))}
            <a href="https://wa.me/34911661641" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 sm:gap-3 bg-[#25D366] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-[#20bd5a] transition-colors mt-2 sm:mt-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
  return (
    <footer className="py-8 sm:py-12 bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <img src="https://aruarestaurantes.com/wp-content/uploads/2025/07/logoo.png" alt="A Rúa" className="h-10 sm:h-12 w-auto opacity-80" />
          <p className="text-[#606060] text-xs sm:text-sm text-center">© {new Date().getFullYear()} A Rúa Restaurante. Grupo Do Meigo.</p>
          <a href="https://www.instagram.com/arua.restaurante/" target="_blank" rel="noopener noreferrer" className="text-[#707070] hover:text-[#c9a227] transition-colors text-sm">📸 Instagram</a>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN
// ============================================================================
export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturedDishes />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ReservationSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </main>
  )
}
