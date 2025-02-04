import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import Layout from "./pages/layout"
import Home from "./pages/home"
import MoviesPage from "./pages/moviespage"
import SingleMoviePage from "./pages/singlemoviepage"
import QuizPage from "./pages/quizpage"
import ErrorPage from "./pages/errorpage"
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movie" element={<SingleMoviePage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals(sendToVercelAnalytics);
