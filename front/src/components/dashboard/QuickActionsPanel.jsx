import { formatCurrency } from '../../utils/formatCurrency'

function QuickActionsPanel({ transfers }) {
  return (
    <aside className="panel panel-stack">
      <section>
        <div className="panel-head">
          <h2>Atalhos</h2>
        </div>
        <div className="quick-actions">
          <button type="button">Criar grupo</button>
          <button type="button">Entrar por código</button>
          <button type="button">Registrar pagamento</button>
        </div>
      </section>

      <section>
        <div className="panel-head">
          <h2>Próximos acertos</h2>
        </div>
        <ul className="list">
          {transfers.map((transfer) => (
            <li key={transfer.id}>
              <p>
                {transfer.from} → {transfer.to}
              </p>
              <strong>{formatCurrency(transfer.amount)}</strong>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default QuickActionsPanel
