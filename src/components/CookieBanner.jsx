import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
    // Initialize analytics here if needed
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-6"
        >
          <div className="max-w-7xl mx-auto bg-gradient-to-r from-gray-900 to-black border-2 border-accent p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span>🍪</span> Cookie Notice
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and
                  personalize content. By clicking "Accept", you consent to our use of cookies.
                  Read our{' '}
                  <a href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </a>{' '}
                  for more information.
                </p>
              </div>

              <div className="flex gap-4 flex-shrink-0">
                <button
                  onClick={declineCookies}
                  className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 transition-colors font-semibold"
                >
                  Decline
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-3 bg-accent text-black hover:bg-white transition-colors font-bold"
                >
                  Accept
                </button>
              </div>

              <button
                onClick={declineCookies}
                className="absolute top-4 right-4 md:relative md:top-0 md:right-0 text-gray-400 hover:text-white transition-colors"
                aria-label="Close cookie banner"
              >
                <FiX size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner
