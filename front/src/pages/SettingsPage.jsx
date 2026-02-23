import AppShell from '../components/layout/AppShell'

function SettingsPage() {
  return (
    <AppShell>
      <header className="dashboard-header page-header">
        <div>
          <p className="eyebrow">Personalização da conta</p>
          <h1>Configurações</h1>
          <p className="page-subtitle">
            Atualize seus dados pessoais e preferências da aplicação.
          </p>
        </div>
      </header>

      <section className="settings-grid">
        <article className="panel settings-panel">
          <h2>Perfil</h2>
          <div className="settings-form-grid">
            <label>
              Nome completo
              <input type="text" defaultValue="Gabriel Benicio" />
            </label>
            <label>
              E-mail
              <input type="email" defaultValue="gabriel@email.com" />
            </label>
            <label>
              Telefone
              <input type="tel" placeholder="(00) 00000-0000" />
            </label>
          </div>
          <button type="button" className="primary-action save-btn">
            Salvar alterações
          </button>
        </article>

        <article className="panel settings-panel">
          <h2>Preferências</h2>
          <div className="settings-options">
            <label className="switch-row">
              <span>Receber lembretes de pagamento</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="switch-row">
              <span>Resumo semanal por e-mail</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="switch-row">
              <span>Mostrar valores em BRL</span>
              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </article>
      </section>
    </AppShell>
  )
}

export default SettingsPage
