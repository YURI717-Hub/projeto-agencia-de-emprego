import '../assets/css/style.css'
import '../assets/css/home.css'
import pessoa from '../assets/img/pessoa.png'
import { Link } from 'react-router-dom'

const stats = [
  { valor: '71%', texto: 'se sentem perdidos na hora de entrar no mercado' },
  { valor: '78%', texto: 'dos jovens não conseguem o primeiro emprego por falta de experiência' },
  { valor: '63%', texto: 'não têm portfólio para mostrar o próprio potencial' },
]

const motivos = [
  'Nós guiamos você em cada passo',
  'Nós ajudamos você a quebrar esse ciclo',
  'Criamos sua presença profissional',
]

function Main() {
  return (
    <main>
      {/* Hero */}
      <section className="container py-5">
        <div className="row align-items-center g-5 py-lg-4">
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-5 fw-bold home-title">
              Sua primeira vaga profissional te espera!
            </h1>
            <p className="lead text-secondary mt-3 mb-4">
              Crie seu perfil, monte seu portfólio e encontre oportunidades
              pensadas para quem está começando.
            </p>

            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
              <button
                type="button"
                className="btn btn-dark btn-lg px-4"
                data-bs-toggle="modal"
                data-bs-target="#authModal"
              >
                Cadastrar
              </button>
              <Link to="/Oportunidades" className="btn btn-outline-dark btn-lg px-4">
                Ver vagas
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="ratio ratio-4x3 home-hero-img">
              <img
                src={pessoa}
                alt="Jovem profissional"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="home-stats">
        <div className="container py-5">
          <div className="row g-4">
            {stats.map((item) => (
              <div className="col-md-4" key={item.valor}>
                <div className="home-stat h-100">
                  <span className="home-stat-valor">{item.valor}</span>
                  <p className="home-stat-texto mb-0">{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que escolher */}
      <section className="container py-5 my-lg-4">
        <h2 className="fw-bold mb-4 text-center text-md-start">
          Por que escolher o FuturoTrabalho
        </h2>
        <div className="row g-4">
          {motivos.map((motivo) => (
            <div className="col-md-4" key={motivo}>
              <div className="home-motivo h-100">
                <p className="fs-5 mb-0">{motivo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main
