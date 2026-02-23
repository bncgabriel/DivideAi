import LoginFormCard from '../components/login/LoginFormCard'
import LoginHero from '../components/login/LoginHero'

function LoginPage() {
  return (
    <main className="login-page">
      <div className="orb orb-left" aria-hidden="true" />
      <div className="orb orb-right" aria-hidden="true" />
      <LoginHero />
      <LoginFormCard />
    </main>
  )
}

export default LoginPage
