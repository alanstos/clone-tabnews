
function Hero() {
  return (
    <header className="hero">
      <h1>Alan Araujo</h1>
      <p>Desenvolvedor de Software focado em soluções web modernas</p>
      <a href="#projetos" className="btn">Ver Projetos</a>
    </header>
  )
}

function About(){
  return (
      <section className="sobre">
      <h2>Sobre mim</h2>
      <p>
        Sou desenvolvedor de software com experiência em aplicações web,
        focado em criar soluções simples, eficientes e com boa experiência
        para o usuário.
      </p>
    </section>
  )
}

function Projets(){
  return (
    <section id="projetos" className="projetos">
      <h2>Projetos</h2>

      <div className="card">
        <h3>🎮 Game Web</h3>
        <p>
          Jogo desenvolvido em HTML, CSS e JavaScript, com foco em lógica
          e interação do usuário.
        </p>
        <a 
          href="https://game.alandev.com.br/"
          target="_blank"
          className="btn"
        >
          Jogar
        </a>
      </div>

    </section>    
  )
}

function Main(){
  return (
    <main className="container">
      { Hero() }
      { About() }
      { Projets() }
    </main>
  )
}

export default Main;
