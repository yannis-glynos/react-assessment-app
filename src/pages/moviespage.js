import FetchAPIData from "../components/fetchapidata"
import MovieCard from "../components/movie_cards"
import { useState } from 'react';
function MoviesPage() {

  const [page, setPage] = useState(1);
  const [search_term, setSearchTerm] = useState("");
  var movies_url;

  if(search_term === ""){
    movies_url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=' + page + '&sort_by=popularity.desc';
  }
  else{
    var urlencoded_search = encodeURI(search_term);
    movies_url = 'https://api.themoviedb.org/3/search/movie?query=' + urlencoded_search + '&include_adult=false&language=en-US&page=' + page;
  }
  const max_pages = 500;
  const { data, loading, error } = FetchAPIData(movies_url, "movies");

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
          We could not find any movies at this time 
          <br/> 
          Please refresh the page later
        </h1>
        <button className="submit-button" onClick={() => window.location.href = '/'}>Back Home</button>
      </div>
    );
  }
  if (data) {
    const page_numbers_list = [];
    var page_numbers = [];
    var i;
    var max_pagination = data.total_pages > max_pages ? max_pages : data.total_pages ;

    if(page > data.total_pages){
      setPage(1);
    }
    
    for(i = 1; i <= max_pagination; i++){
      page_numbers_list.push(i);
    }

    if(page_numbers_list.length > 10){

      if(page < 8){
        page_numbers = page_numbers_list.slice(0, 7);
      }
      else{
        page_numbers = page_numbers_list.slice(page - 5 > 1 ? page - 5 : 0 , page + 2 < max_pagination ? page + 2 : max_pagination);
      }
    }
    
    return (
      <div className="container-inner col">
        <div className="movie-page-banner">
          <span>Most Popular Movies</span>
          <span>Page {data.page}</span>
          <input
          placeholder="Search Movies.."
          onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="container-inner col">
        {Array.isArray(data.results) ? (
          <div className="container-inner movies-grid">
            {data.results.map((item, index) => (
              <MovieCard movie={item}/>
            ))}
          </div>
        ) : (
          ""
        )}
        </div>
        <div className="container-inner col">
          <div className="pagination">
            <span className="pagination-button" onClick={() => setPage(1)}>&laquo;</span>
            <span className="pagination-button" onClick={() => setPage(page === 1 ? page : page - 1)}>&#8249;</span>
            {page_numbers.map((pageNumber) => (
              <span className="pagination-button" onClick={() => setPage(pageNumber)}> {pageNumber} </span>
            ))}
            <span className="pagination-button" onClick={() => setPage(page === data.total_pages || page === max_pages ? page : page + 1)}>&#8250;</span>
            <span className="pagination-button" onClick={() => setPage(data.total_pages > max_pages ? max_pages : data.total_pages)}>&#187;</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesPage; 