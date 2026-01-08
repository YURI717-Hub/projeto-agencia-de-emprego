import { useState, useEffect } from "react"
import { ref, push, onValue } from "firebase/database"
import { db } from "../firebaseConfig"
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

type Vaga = VagaForm & {
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

  // Abrir e fechar modal
  const abrirModal = () => setMostrarModal(true)
  const fecharModal = () => setMostrarModal(false)

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

    try {
      const vagaRef = ref(db, "vagas/")
      await push(vagaRef, vaga)

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
  // LER VAGAS
  // =======================
  useEffect(() => {
    const vagasRef = ref(db, "vagas/")

    onValue(vagasRef, (snapshot) => {
      const data = snapshot.val() as Record<string, VagaForm> | null

      if (data) {
        const listaVagas: Vaga[] = Object.entries(data).map(
          ([id, value]) => ({
            id,
            ...value,
          })
        )

        setVagas(listaVagas)
      } else {
        setVagas([])
      }
    })
  }, [])

  // =======================
  // RENDER
  // =======================
  return (
    <>
      <div className="aprese">
        <img src={empresaLogo} alt="Logo da empresa" className="fi" />
        <h1>Olá, [Nome da empresa]</h1>
      </div>

      {/* LISTA DE VAGAS */}
      <div className="vaga-anuciadas">
        <h2>Vagas que já anunciou</h2>

        <div className="anunciada">
          {vagas.length > 0 ? (
            vagas.map((v) => (
              <div key={v.id} className="vaga-card">
                <h3>{v.titulo}</h3>
                <p><strong>Área:</strong> {v.area}</p>
                <p><strong>Cidade:</strong> {v.cidade}</p>
                <p><strong>Tipo:</strong> {v.tipo}</p>
                <p><strong>Descrição:</strong> {v.descricao}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma vaga publicada ainda.</p>
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
