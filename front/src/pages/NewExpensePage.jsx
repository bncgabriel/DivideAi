import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import { groupDetailsMock } from '../data/groupDetailsMock'
import { formatCurrency } from '../utils/formatCurrency'

function NewExpensePage() {
  const { groupId } = useParams()
  const [title, setTitle] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [feedback, setFeedback] = useState('')

  const group = useMemo(() => groupDetailsMock[groupId], [groupId])

  const parsedAmount = Number(String(totalAmount).replace(',', '.'))
  const hasValidAmount = Number.isFinite(parsedAmount) && parsedAmount > 0
  const includedCount = selectedMembers.length
  const amountPerParticipant =
    hasValidAmount && includedCount > 0 ? parsedAmount / includedCount : 0

  const isFormValid = title.trim() && hasValidAmount && includedCount > 0

  const toggleMember = (member) => {
    setSelectedMembers((current) =>
      current.includes(member)
        ? current.filter((item) => item !== member)
        : [...current, member],
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setHasAttemptedSubmit(true)

    if (!isFormValid) {
      return
    }

    setFeedback('Despesa pronta para envio.')
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
          <p className="eyebrow">Nova despesa</p>
          <h1>{group.name}</h1>
          <p className="page-subtitle">
            Preencha os dados abaixo para registrar uma nova despesa no grupo.
          </p>
        </div>
        <Link to={`/groups/${group.id}`} className="secondary-action details-back-btn">
          Voltar ao grupo
        </Link>
      </header>

      <section className="expense-dialog-overlay">
        <article
          className="panel expense-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-expense-title"
        >
          <h2 id="new-expense-title">Adicionar despesa</h2>

          <form className="expense-dialog-form" onSubmit={handleSubmit}>
            <label>
              Título
              <input
                type="text"
                required
                placeholder="Ex.: Jantar no sábado"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>

            <label>
              Valor total
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                placeholder="0,00"
                value={totalAmount}
                onChange={(event) => setTotalAmount(event.target.value)}
              />
            </label>

            <fieldset className="expense-dialog-fieldset">
              <legend>Participantes incluídos</legend>
              <ul className="expense-member-list">
                {group.members.map((member) => (
                  <li key={member}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member)}
                        onChange={() => toggleMember(member)}
                      />
                      <span>{member}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            {hasAttemptedSubmit && includedCount === 0 && (
              <span className="form-error">Selecione pelo menos um participante.</span>
            )}

            <div className="expense-dialog-preview">
              <p>Participantes incluídos: {includedCount}</p>
              <strong>
                Valor por participante: {formatCurrency(amountPerParticipant)}
              </strong>
            </div>

            <div className="expense-dialog-actions">
              <Link to={`/groups/${group.id}`} className="secondary-action">
                Cancelar
              </Link>
              <button type="submit" className="primary-action">
                Enviar despesa
              </button>
            </div>

            {feedback && <span className="expense-feedback">{feedback}</span>}
          </form>
        </article>
      </section>
    </AppShell>
  )
}

export default NewExpensePage
