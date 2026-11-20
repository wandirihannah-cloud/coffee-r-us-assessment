
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import useCoffee from "./hooks/useCoffee";

function App() {
  const {
    coffees,
    loading,
    error,
    addCoffee,
    updateCoffee,
    deleteCoffee
  } = useCoffee();

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/shop"
          element={
            <Shop
              coffees={coffees}
              loading={loading}
              error={error}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <Admin
              coffees={coffees}
              loading={loading}
              error={error}
              addCoffee={addCoffee}
              updateCoffee={updateCoffee}
              deleteCoffee={deleteCoffee}
            />
          }
        />

        <Route
          path="*"
          element={
            <main className="not-found">
              <h1>Page Not Found</h1>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
