
import "../assets/css/sobre.css"


function Sobre() {
  return (
    <div className="container">
      {/* Imagem de Banner (antes da missão) */}
      <br />
      <br />
  
      {/* Seção 'Nossa Missão' */}
      <h2 className="titulo-na">Nossa Missão</h2>
      <p>
        Conectamos jovens talentos com empresas que acreditam no futuro. Nossa
        missão é facilitar o acesso ao primeiro emprego por meio de vagas de
        Jovem Aprendiz e Estágio, promovendo inclusão, educação e desenvolvimento
        profissional.
      </p>

      {/* Seção 'Quem Somos' */}
      <h2  className="titulo-na">Quem Somos</h2>
      <div className="row">
        <div className="col-md-6">
          <p>
            Somos uma equipe comprometida com a transformação social através da
            empregabilidade. Criamos a Agência Jovem Oportunidade para ser uma
            ponte entre estudantes cheios de potencial e empresas que valorizam a
            formação de novos profissionais.
          </p>
        </div>
      </div>

      {/* Seção 'O que Fazemos' */}
      <h2  className="titulo-na">O que Fazemos</h2>
      <p>
        - Divulgamos vagas de Jovem Aprendiz e Estágio <br />
        - Oferecemos orientação sobre processos seletivos <br />
        - Ajudamos jovens a criarem currículos atrativos <br />
        - Estabelecemos parcerias com escolas, ONGs e empresas <br />
        - Incentivamos empresas a investirem em talentos iniciantes
      </p>

      {/* Seção 'Nosso Público' */}
      <h2  className="titulo-na">Nosso Público</h2>
      <div className="container">
        <p>
          Atendemos jovens entre 14 e 24 anos em busca da primeira oportunidade
          profissional, e empresas de todos os portes que desejam contribuir com
          o desenvolvimento da juventude.
        </p>
      </div>

      {/* Seção 'Nossos Valores' */}
      <h2 className="titulo-na">Nossos Valores</h2>
      <p>
        Inclusão, educação, transparência, responsabilidade social e compromisso
        com o futuro dos jovens.
      </p>

      {/* Call-to-action */}
      <div className="cta text-center mt-4">
        <p>
          <strong>É jovem e quer se candidatar?</strong>{" "}
          <a href="#"   data-bs-toggle="modal"
                data-bs-target="#authModal">Cadastre-se aqui</a>
        </p>
        <p>
          <strong>É empresa e quer contratar?</strong>{" "}
          <a href="#"
            data-bs-toggle="modal"
            data-bs-target="#authModal">Cadastre-se aqui</a>
        </p>
      </div>
    </div>
  );
}

export default Sobre;
