import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
