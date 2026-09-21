import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/welcome";
import Login from "./pages/login";
import Home from "./pages/home";
import Ask from "./pages/ask";
import Scan from "./pages/scan";
import Practice from "./pages/practice";
import ExamMode from "./pages/exammode";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/ask" element={<Ask />} />

        <Route path="/scan" element={<Scan />} />

        <Route path="/practice" element={<Practice />} />

        <Route path="/exam" element={<ExamMode />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;