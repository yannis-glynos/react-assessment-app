function MovieCard(props) {
  const movie = props.movie;
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
    <div className="movie-card">
      <div className="movie-card-top">
        <a href={"/movie?q=" + movie.id}>
          <span className="movie-date">{month + " " + year.toString()}</span>
          <img src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} alt={movie.original_title}/>
        </a>
      </div>
      <div className="movie-rating-outer">
        <div className="movie-rating-inner" style={{width:movie.vote_average*10 +'%', opacity:movie.vote_average*0.1 }}>
          {movie.vote_average*10 +'%'}
        </div>
      </div>
      <div className="movie-container">
        <a href={"/movie?q=" + movie.id}>
        <h4><b>{movie.original_title}</b></h4>
        <p className="movie-summary">{movie.overview}</p>
        </a>
      </div>
    </div>
  );
}

export default MovieCard;