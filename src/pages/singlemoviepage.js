import FetchAPIData from "../components/fetchapidata"
function SingleMoviePage() {
  var movie_id = new URL(window.location.href).searchParams.get("q");
  const { data, loading, error } = FetchAPIData('https://api.themoviedb.org/3/movie/' + movie_id + '?language=en-US', "movies");
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-icon"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className='quiz-end'>
        <h1>
        We could not find this movie at this time
          <br/> 
          Please refresh the page later
        </h1>
        <button className="submit-button" onClick={() => window.location.href = '/'}>Back Home</button>
      </div>
    );
  }
  if (data) {
    const movie = data;
    const movie_collection = movie.belongs_to_collection ? 'Part of the "' + movie.belongs_to_collection.name +'"' : "";

    const d = new Date();
  var year;
  var month_no;
  try{
    year = movie.release_date.substring(0, movie.release_date.indexOf("-"));
  }
  catch{
    year = d.getFullYear();
  }

  try{
    month_no = Number(movie.release_date.substring(movie.release_date.indexOf("-") + 1, movie.release_date.lastIndexOf("-")));
  }
  catch{
    month_no = d.getMonth();
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[month_no - 1];

    return (
      <div className="container-inner col">
        <div>
          <span className="movie-name">{movie.original_title}</span>
          <img className="movie-poster" src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path} alt={movie.original_title}/>
        </div>
        <div className="container-inner col">
          <div className="container-inner row" style={{width:"100%"}}>
            <span className="movie-name-title">{movie.original_title}</span>
            <div className="container-inner row movie-genre-list">
              {movie.genres.map((genre) => (
                <span className="movie-genre">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          {
            movie_collection !== "" ? 
            <div className="movie-page-banner">
              <h3>{movie_collection}</h3>
            </div> : ""
          }
          <div className="movie-movie_overview">
            <p>
              {movie.overview}
            </p>
            <p>
              Movie status: {movie.status} 
              <br/> 
              Movie Release Date: {month + " " + year.toString()}
              <br/> 
              Spoken Languages:
              {movie.spoken_languages.map((language) => (
                <span> {language.name} </span>
              ))}
              <br/> 
              Movie Rating: 
              {' ' + Math.round(movie.vote_average*10) +'%'}
            </p>
          </div>
          <div className="movie-production-list">
              {movie.production_companies.map((production_company) => (
                <div className="movie-production">
                  <img src={"https://image.tmdb.org/t/p/w300" + production_company.logo_path} alt={production_company.name}/>
                </div>
              ))}
            </div>
        </div>
      </div>
    );
  }
}

export default SingleMoviePage;