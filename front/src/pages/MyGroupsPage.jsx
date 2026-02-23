import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import { groupsMock } from '../data/dashboardMock'
import { formatCurrency } from '../utils/formatCurrency'

function MyGroupsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredGroups = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (!normalizedSearch) {
      return groupsMock
    }

    return groupsMock.filter((group) =>
      group.name.toLowerCase().includes(normalizedSearch),
    )
  }, [searchTerm])

  return (
    <AppShell>
      <header className="dashboard-header page-header">
        <div>
          <p className="eyebrow">Organização dos grupos</p>
          <h1>Meus grupos</h1>
          <p className="page-subtitle">
            Visualize seus grupos, acompanhe os saldos e entre por código quando
            necessário.
          </p>
        </div>
        <div className="header-actions">
          <button type="button" className="secondary-action">
            Entrar por código
          </button>
          <button type="button" className="primary-action">
            + Criar grupo
          </button>
        </div>
      </header>

      <section className="groups-search-bar" aria-label="Pesquisar grupos">
        <input
          type="search"
          placeholder="Pesquisar grupo por nome..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </section>

      <section className="groups-page-grid">
        {filteredGroups.map((group) => (
          <article key={group.id} className="group-overview-card">
            <div className="group-overview-head">
              <h2>{group.name}</h2>
              <span>{group.members} membros</span>
            </div>

            <div className="group-kpis">
              <div className="group-kpi-item">
                <p>Total do mês</p>
                <strong>{formatCurrency(group.monthTotal)}</strong>
              </div>
              <div className="group-kpi-item group-kpi-right">
                <p>Seu saldo</p>
                <strong className={group.myBalance >= 0 ? 'positive' : 'negative'}>
                  {formatCurrency(group.myBalance)}
                </strong>
              </div>
            </div>

            <div className="group-overview-actions">
              <Link to={`/groups/${group.id}`} className="group-action-link">
                Ver detalhes
              </Link>
              <button type="button" className="ghost-btn">Convidar</button>
            </div>
          </article>
        ))}
      </section>

      {filteredGroups.length === 0 && (
        <section className="panel groups-empty-state">
          <h2>Nenhum grupo encontrado</h2>
          <p>Tente outro termo de pesquisa para localizar seus grupos.</p>
        </section>
      )}
    </AppShell>
  )
}

export default MyGroupsPage
