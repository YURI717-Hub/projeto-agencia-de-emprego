import { useState, useEffect } from "react"
import { ref, push, onValue, remove, get } from "firebase/database"
import { onAuthStateChanged } from "firebase/auth"
import type { User } from "firebase/auth"
import { auth, db } from "../firebaseConfig"
import "../assets/css/anunciar.css"
import "../assets/css/oportunidades.css"
import empresaLogo from "../assets/img/empresa2.png"

// =======================
// TIPOS
// =======================
type VagaForm = {
  titulo: string
  area: string
  tipo: string
  cidade: string
  descricao: string
}

// O que fica salvo no banco (dono e nome da empresa vão junto)
type VagaSalva = VagaForm & {
  uid?: string
  empresa?: string
}

type Vaga = VagaSalva & {
  id: string
}

// =======================
// COMPONENTE
// =======================
function Anuncia() {
  const [mostrarModal, setMostrarModal] = useState<boolean>(false)

  const [vaga, setVaga] = useState<VagaForm>({
    titulo: "",
    area: "",
    tipo: "",
    cidade: "",
    descricao: "",
  })

  const [vagas, setVagas] = useState<Vaga[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [nomeEmpresa, setNomeEmpresa] = useState<string>("")

  // Abrir e fechar modal
  const abrirModal = () => setMostrarModal(true)
  const fecharModal = () => setMostrarModal(false)

  // =======================
  // USUÁRIO LOGADO + NOME DA EMPRESA
  // =======================
  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, async (u) => {
      setUser(u)

      if (!u) {
        setNomeEmpresa("")
        return
      }

      const reserva = u.displayName ?? u.email?.split("@")[0] ?? "empresa"

      try {
        const snap = await get(ref(db, `usuarios/${u.uid}`))
        const dados = snap.val() ?? {}
        setNomeEmpresa(dados.nomeEmpresa ?? dados.nome ?? dados.empresa ?? reserva)
      } catch {
        setNomeEmpresa(reserva)
      }
    })

    return cancelar
  }, [])

  // =======================
  // ATUALIZAR INPUTS
  // =======================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setVaga((prev) => ({ ...prev, [name]: value }))
  }

  // =======================
  // ENVIAR VAGA
  // =======================
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!user) {
      alert("Faça login para publicar uma vaga.")
      return
    }

    try {
      const vagaRef = ref(db, "vagas/")
      await push(vagaRef, { ...vaga, uid: user.uid, empresa: nomeEmpresa })

      alert("✅ Vaga publicada com sucesso!")

      setVaga({
        titulo: "",
        area: "",
        tipo: "",
        cidade: "",
        descricao: "",
      })

      fecharModal()
    } catch (error) {
      console.error("Erro ao salvar vaga:", error)
      alert("❌ Ocorreu um erro ao publicar a vaga.")
    }
  }

  // =======================
  // EXCLUIR VAGA
  // =======================
  const excluirVaga = async (v: Vaga) => {
    if (!window.confirm(`Excluir a vaga "${v.titulo}"?`)) return

    try {
      await remove(ref(db, `vagas/${v.id}`))
    } catch (error) {
      console.error("Erro ao excluir vaga:", error)
      alert("❌ Não foi possível excluir a vaga. Tente novamente.")
    }
  }

  // =======================
  // LER VAGAS (somente as da empresa logada)
  // =======================
  const uid = user?.uid

  useEffect(() => {
    if (!uid) {
      setVagas([])
      return
    }

    const vagasRef = ref(db, "vagas/")

    const parar = onValue(vagasRef, (snapshot) => {
      const data = snapshot.val() as Record<string, VagaSalva> | null

      if (data) {
        const listaVagas: Vaga[] = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .filter((v) => v.uid === uid)
          .reverse() // mais recentes primeiro

        setVagas(listaVagas)
      } else {
        setVagas([])
      }
    })

    return parar
  }, [uid])

  // =======================
  // RENDER
  // =======================
  return (
    <>
      <div className="aprese">
        <img src={empresaLogo} alt="Logo da empresa" className="fi" />
        <h1>{user ? `Olá, ${nomeEmpresa}` : "Olá!"}</h1>
      </div>

      {/* LISTA DE VAGAS */}
      <div className="vaga-anuciadas">
        <h2>Vagas que já anunciou</h2>

        <div className="anunciada">
          {!user ? (
            <p>Faça login para ver e anunciar as vagas da sua empresa.</p>
          ) : vagas.length === 0 ? (
            <p>Nenhuma vaga publicada ainda.</p>
          ) : (
            // 1 coluna no celular, 2 no tablet e 3 lado a lado no computador
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {vagas.map((v) => (
                <div className="col" key={v.id}>
                  <div className="vaga-card h-100">
                    <h3>{v.titulo}</h3>
                    <p><strong>Área:</strong> {v.area}</p>
                    <p><strong>Cidade:</strong> {v.cidade}</p>
                    <p><strong>Tipo:</strong> {v.tipo}</p>
                    <p><strong>Descrição:</strong> {v.descricao}</p>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm mt-3"
                      onClick={() => excluirVaga(v)}
                    >
                      Excluir vaga
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <br />

      {/* BOTÃO */}
      <div className="butom-espaço">
        <button className="NV" onClick={abrirModal}>
          + Anunciar Nova Vaga
        </button>
      </div>

      {/* MODAL */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="fechar-modal" onClick={fecharModal}>
              ✕
            </button>

            <h2>Anunciar Nova Vaga</h2>

            <form className="form-vaga" onSubmit={handleSubmit}>
              <label>Título da Vaga:</label>
              <input
                type="text"
                name="titulo"
                value={vaga.titulo}
                onChange={handleChange}
                required
              />

              <label>Área:</label>
              <input
                type="text"
                name="area"
                value={vaga.area}
                onChange={handleChange}
                required
              />

              <label>Tipo de Contrato:</label>
              <select
                name="tipo"
                value={vaga.tipo}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Estágio">Estágio</option>
                <option value="Jovem Aprendiz">Jovem Aprendiz</option>
              </select>

              <label>Cidade:</label>
              <input
                type="text"
                name="cidade"
                value={vaga.cidade}
                onChange={handleChange}
                required
              />

              <label>Descrição:</label>
              <textarea
                name="descricao"
                rows={4}
                value={vaga.descricao}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn-enviar">
                Publicar Vaga
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Anuncia
