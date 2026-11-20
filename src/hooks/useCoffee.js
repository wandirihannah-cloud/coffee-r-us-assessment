
import { useState, useEffect, useCallback } from "react";

const API = "http://localhost:3001/products";

function useCoffee() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCoffees = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Could not load coffee products.");
      }

      const data = await response.json();
      setCoffees(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoffees();
  }, [fetchCoffees]);

  const addCoffee = async (coffee) => {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coffee)
    });

    if (!response.ok) {
      throw new Error("Could not add coffee.");
    }

    const newCoffee = await response.json();
    setCoffees((current) => [...current, newCoffee]);
  };

  const updateCoffee = async (id, updatedCoffee) => {
    const response = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCoffee)
    });

    if (!response.ok) {
      throw new Error("Could not update coffee.");
    }

    const savedCoffee = await response.json();

    setCoffees((current) =>
      current.map((coffee) =>
        String(coffee.id) === String(id) ? savedCoffee : coffee
      )
    );
  };

  const deleteCoffee = async (id) => {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Could not delete coffee.");
    }

    setCoffees((current) =>
      current.filter((coffee) => String(coffee.id) !== String(id))
    );
  };

  return {
    coffees,
    loading,
    error,
    fetchCoffees,
    addCoffee,
    updateCoffee,
    deleteCoffee
  };
}

export default useCoffee;
