import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatCurrency'

function GroupsPanel({ groups }) {
  return (
    <article className="panel">
      <div className="panel-head">
        <h2>Seus grupos</h2>
        <Link to="/groups">Ver todos</Link>
      </div>

      <div className="groups-grid">
        {groups.map((group) => (
          <article key={group.id} className="group-card">
            <h3>{group.name}</h3>
            <p>{group.members} membros</p>
            <strong>{formatCurrency(group.monthTotal)}</strong>
            <span className={group.myBalance >= 0 ? 'positive' : 'negative'}>
              Seu saldo: {formatCurrency(group.myBalance)}
            </span>
            <Link to={`/groups/${group.id}`} className="group-card-link">
              Abrir grupo
            </Link>
          </article>
        ))}
      </div>
    </article>
  )
}

export default GroupsPanel
