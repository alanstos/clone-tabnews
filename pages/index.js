
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

function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Caro amigo, a Terra é redonda. Acredite! =D
      </h1>
      <div className="w-full max-w-xl aspect-video">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/Eup5uWLvhqw"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </main>
  );
}

export default Main;
