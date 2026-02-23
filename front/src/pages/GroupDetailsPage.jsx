import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import { groupDetailsMock } from '../data/groupDetailsMock'
import { formatCurrency } from '../utils/formatCurrency'
import { formatDateBr } from '../utils/formatDateBr'

function GroupDetailsPage() {
  const { groupId } = useParams()
  const [copiedField, setCopiedField] = useState('')

  const group = useMemo(() => groupDetailsMock[groupId], [groupId])
  const paymentSummary = useMemo(() => {
    const totalAmount = group
      ? group.payments.reduce((acc, payment) => acc + payment.amount, 0)
      : 0
    const completed = group
      ? group.payments.filter((payment) => payment.status === 'Concluído')
      : []
    const pending = group
      ? group.payments.filter((payment) => payment.status !== 'Concluído')
      : []

    return {
      totalAmount,
      completedCount: completed.length,
      pendingCount: pending.length,
      pendingAmount: pending.reduce((acc, payment) => acc + payment.amount, 0),
    }
  }, [group])

  const handleCopy = async (value, field) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)
      setTimeout(() => setCopiedField(''), 1500)
    } catch {
      setCopiedField('erro')
      setTimeout(() => setCopiedField(''), 1500)
    }
  }

  if (!group) {
    return (
      <AppShell>
        <section className="panel details-empty">
          <h1>Grupo não encontrado</h1>
          <p>Esse grupo não existe ou foi removido.</p>
          <Link to="/groups" className="primary-action back-link">
            Voltar para Meus grupos
          </Link>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <header className="dashboard-header page-header group-details-header">
        <div className="group-details-heading">
          <p className="eyebrow">Gestão do grupo</p>
          <h1>{group.name}</h1>
          <div className="group-header-meta">
            <div className="group-meta-pill group-meta-pill-code">
              <span>
                <strong>Código:</strong> {group.code}
              </span>
              <button
                type="button"
                className="meta-copy-btn"
                onClick={() => handleCopy(group.code, 'code')}
              >
                {copiedField === 'code' ? 'Código copiado' : 'Copiar código'}
              </button>
            </div>
            <div className="group-meta-pill group-meta-pill-link">
              <span>
                <strong>Link:</strong> {group.inviteLink}
              </span>
              <button
                type="button"
                className="meta-copy-btn"
                onClick={() => handleCopy(group.inviteLink, 'link')}
              >
                {copiedField === 'link' ? 'Link copiado' : 'Copiar link'}
              </button>
            </div>
          </div>
          <p className="page-subtitle">
            Convide participantes e acompanhe os detalhes de pagamentos do grupo.
          </p>
          {copiedField === 'erro' && (
            <span className="copy-error">Não foi possível copiar agora.</span>
          )}
        </div>
        <div className="details-header-actions">
          <Link to={`/groups/${group.id}/expense/new`} className="primary-action details-new-expense-btn">
            + Nova despesa
          </Link>
          <Link to="/groups" className="secondary-action details-back-btn">
            Voltar para grupos
          </Link>
        </div>
      </header>

      <section className="group-details-grid">
        <article className="panel details-panel payment-overview-panel">
          <h2>Resumo de pagamentos</h2>

          <div className="payment-overview-grid">
            <div className="payment-overview-item">
              <p>Total movimentado</p>
              <strong>{formatCurrency(paymentSummary.totalAmount)}</strong>
            </div>
            <div className="payment-overview-item">
              <p>Pagamentos concluídos</p>
              <strong className="positive">{paymentSummary.completedCount}</strong>
            </div>
            <div className="payment-overview-item">
              <p>Pagamentos pendentes</p>
              <strong className="negative">{paymentSummary.pendingCount}</strong>
            </div>
            <div className="payment-overview-item">
              <p>Valor pendente</p>
              <strong className={paymentSummary.pendingAmount > 0 ? 'negative' : 'positive'}>
                {formatCurrency(paymentSummary.pendingAmount)}
              </strong>
            </div>
          </div>

          <div className="panel-head payment-details-head">
            <h2>Detalhes de pagamentos</h2>
          </div>

          <div className="payments-table-wrapper">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Pagador</th>
                  <th>Recebedor</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {group.payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{formatDateBr(payment.date)}</td>
                    <td>{payment.payer}</td>
                    <td>{payment.receiver}</td>
                    <td>{formatCurrency(payment.amount)}</td>
                    <td>
                      <span
                        className={
                          payment.status === 'Concluído'
                            ? 'payment-status positive'
                            : 'payment-status negative'
                        }
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel details-panel members-panel">
          <h2>Membros ({group.members.length})</h2>
          <ul className="member-list">
            {group.members.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </article>
      </section>
    </AppShell>
  )
}

export default GroupDetailsPage
