import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MoviePage from "./Pages/MoviePage";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:movieId" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;
