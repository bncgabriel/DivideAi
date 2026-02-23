import { formatCurrency } from '../../utils/formatCurrency'

function SummaryGrid({ summary }) {
  return (
    <section className="summary-grid" aria-label="Resumo financeiro">
      <article className="summary-card">
        <p>Saldo geral</p>
        <strong>{formatCurrency(summary.myBalance)}</strong>
        <span className={summary.myBalance >= 0 ? 'positive' : 'negative'}>
          {summary.myBalance >= 0 ? 'Você recebe' : 'Você paga'}
        </span>
      </article>

      <article className="summary-card">
        <p>A receber</p>
        <strong>{formatCurrency(summary.toReceive)}</strong>
        <span className="positive">Transferências pendentes</span>
      </article>

      <article className="summary-card">
        <p>A pagar</p>
        <strong>{formatCurrency(summary.toPay)}</strong>
        <span className="negative">Acertos recomendados</span>
      </article>

      <article className="summary-card">
        <p>Total dos grupos no mês</p>
        <strong>{formatCurrency(summary.totalMonth)}</strong>
        <span className="muted">3 grupos ativos</span>
      </article>
    </section>
  )
}

export default SummaryGrid
