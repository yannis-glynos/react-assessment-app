import { useState, useEffect } from 'react';

function FetchAPIData(url, type) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var options = {};

  if(type == "movies"){
    options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTE3MzEyYWM1OTc4ZWYxYWMxNzEyMjMzZjg5ZmI4MiIsIm5iZiI6MTczODUyMjgwNy45OTksInN1YiI6IjY3OWZjMGI3YTg5MzU5MTQxNTk1Njc4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.szlntLC3guiAFEPbA3ggpospYOtf6g0O9eqqFS4X_iY'
      }
    };
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Dependency array with URL to avoid unnecessary re-fetching

  return { data, loading, error };
}

export default FetchAPIData;