import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MoviePage from "./Pages/MoviePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:movieId" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
