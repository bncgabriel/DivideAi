import { formatCurrency } from '../../utils/formatCurrency'

function RecentActivityPanel({ activities }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Atividade recente</h2>
        <a href="#">Histórico completo</a>
      </div>

      <ul className="list activity-list">
        {activities.map((activity) => (
          <li key={activity.id}>
            <div>
              <p>{activity.title}</p>
              <span>{activity.date}</span>
            </div>
            <strong>{formatCurrency(activity.amount)}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecentActivityPanel
