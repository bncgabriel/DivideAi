import { useEffect, useState } from 'react'
import Sidebar from '../dashboard/Sidebar'

function AppShell({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <main className="dashboard-page">
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label="Abrir menu"
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <button
        type="button"
        aria-label="Fechar menu"
        className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'visible' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      <section className="dashboard-content">{children}</section>
    </main>
  )
}

export default AppShell
