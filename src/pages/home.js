import MoviesPoster from "../assets/moviesPoster.png"
import QuizPoster from "../assets/QuizPoster.webp"
function Home() {
  return (
    <div className="container-inner col">
      <h1 style={{textAlign: "center"}}>
        What would you like to view?
      </h1>
      <div className="container-inner home-grid">
        <div className="homepage-feature" onClick={() => window.location.href = '/quiz'}>
          <img src={QuizPoster} alt="Quiz"/>
          <div class="homepage-feature-overlay">Quiz</div>
        </div>
        <div className="homepage-feature" onClick={() => window.location.href = '/movies'}>
          <img src={MoviesPoster} alt="Movies"/>
          <div class="homepage-feature-overlay">Movies</div>
        </div>
      </div>
    </div>
  );
}

export default Home;