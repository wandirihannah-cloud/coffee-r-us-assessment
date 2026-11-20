
import { useState } from "react";
import CoffeeForm from "../components/CoffeeForm";

function Admin({
  coffees,
  loading,
  error,
  addCoffee,
  updateCoffee,
  deleteCoffee
}) {
  const [editingCoffee, setEditingCoffee] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (coffeeData) => {
    try {
      if (editingCoffee) {
        await updateCoffee(editingCoffee.id, coffeeData);
        setMessage("Coffee updated successfully.");
        setEditingCoffee(null);
      } else {
        await addCoffee(coffeeData);
        setMessage("Coffee added successfully.");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this coffee?"
    );

    if (!confirmed) return;

    try {
      await deleteCoffee(id);
      setMessage("Coffee deleted successfully.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="admin-page">
      <h1>Admin Portal</h1>
      <p className="admin-intro">Manage your Coffee R Us products here.</p>

      <CoffeeForm
        onSubmit={handleSubmit}
        editingCoffee={editingCoffee}
        onCancel={() => setEditingCoffee(null)}
      />

      {message && <p className="message">{message}</p>}
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <section className="admin-products">
        <h2>Manage Coffee Products</h2>

        {coffees.map((coffee) => (
          <div className="admin-product" key={coffee.id}>
            <div>
              <h3>{coffee.name}</h3>
              <p>Origin: {coffee.origin}</p>
              <p>Price: Ksh {Number(coffee.price).toLocaleString()}</p>
              <p>{coffee.location}</p>
            </div>

            <div className="admin-actions">
              <button onClick={() => setEditingCoffee(coffee)}>
                Edit
              </button>

              <button
                className="delete-button"
                onClick={() => handleDelete(coffee.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Admin;
