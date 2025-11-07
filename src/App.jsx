import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import CaseStudies from './components/CaseStudies'
import Footer from './components/Footer'
import DeckOverlay from './components/DeckOverlay'
import CookieBanner from './components/CookieBanner'

function App() {
  const [isDeckOpen, setIsDeckOpen] = useState(false)

  // Handle URL-based deck opening
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#deck') {
        setIsDeckOpen(true)
      } else if (isDeckOpen) {
        setIsDeckOpen(false)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [isDeckOpen])

  const openDeck = () => {
    window.location.hash = 'deck'
    setIsDeckOpen(true)
  }

  const closeDeck = () => {
    window.history.replaceState(null, null, ' ')
    setIsDeckOpen(false)
  }

  return (
    <div className="relative bg-black text-white">
      <Hero onOpenDeck={openDeck} />
      <Services />
      <CaseStudies />
      <Footer />
      <DeckOverlay isOpen={isDeckOpen} onClose={closeDeck} />
      <CookieBanner />
    </div>
  )
}

export default App
