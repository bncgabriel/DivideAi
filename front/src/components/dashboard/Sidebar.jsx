import { NavLink, useNavigate } from 'react-router-dom'

function Sidebar({ isMobileMenuOpen, onCloseMobileMenu }) {
  const navigate = useNavigate()

  return (
    <aside
      className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      aria-label="Navegação principal"
    >
      <div className="sidebar-brand">
        <span className="brand-badge">D</span>
        <div>
          <strong>DivideAi</strong>
          <p>Área do usuário</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={onCloseMobileMenu}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/groups"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={onCloseMobileMenu}
        >
          Meus grupos
        </NavLink>
        <button type="button">Despesas</button>
        <button type="button">Pagamentos</button>
        <button type="button">Relatórios</button>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={onCloseMobileMenu}
        >
          Configurações
        </NavLink>
      </nav>

      <button
        type="button"
        className="logout-btn"
        onClick={() => {
          onCloseMobileMenu()
          navigate('/login')
        }}
      >
        Sair da conta
      </button>
    </aside>
  )
}

export default Sidebar
