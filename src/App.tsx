import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home";
import { Content } from "./pages/content";
import { NotFound } from "./pages/notFound";
import { About } from "./pages/about";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:class/:topic" element={<Content />} />
        <Route path="/about" element={<About />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export { App };
