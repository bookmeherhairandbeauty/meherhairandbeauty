import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="book" element={<Book />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="*"
          element={
            <section className="wrap section">
              <h1>Page not found.</h1>
              <Link className="button button-primary" to="/">
                Back to Home
              </Link>
            </section>
          }
        />
      </Route>
    </Routes>
  );
}
