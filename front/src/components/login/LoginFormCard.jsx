import { useNavigate } from 'react-router-dom'

function LoginFormCard() {
  const navigate = useNavigate()

  return (
    <section className="login-card" aria-label="Formulário de login">
      <header>
        <h2>Entrar</h2>
        <p>Acesse sua conta para continuar.</p>
      </header>

      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault()
          navigate('/dashboard')
        }}
      >
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" placeholder="você@exemplo.com" />

        <label htmlFor="password">Senha</label>
        <input id="password" type="password" placeholder="Digite sua senha" />

        <div className="form-row">
          <label className="remember">
            <input type="checkbox" />
            <span>Lembrar de mim</span>
          </label>
          <a href="#" className="forgot-link">
            Esqueci a senha
          </a>
        </div>

        <button type="submit">Entrar</button>
      </form>

      <footer>
        Não tem conta? <a href="#">Criar agora</a>
      </footer>
    </section>
  )
}

export default LoginFormCard
