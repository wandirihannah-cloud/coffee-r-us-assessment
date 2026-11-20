
import { useState, useEffect } from "react";

function CoffeeForm({ onSubmit, editingCoffee, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    origin: "",
    price: "",
    location: "Location 1"
  });

  useEffect(() => {
    if (editingCoffee) {
      setFormData({
        name: editingCoffee.name,
        description: editingCoffee.description,
        origin: editingCoffee.origin,
        price: editingCoffee.price,
        location: editingCoffee.location
      });
    } else {
      setFormData({
        name: "",
        description: "",
        origin: "",
        price: "",
        location: "Location 1"
      });
    }
  }, [editingCoffee]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      ...formData,
      price: Number(formData.price)
    });

    if (!editingCoffee) {
      setFormData({
        name: "",
        description: "",
        origin: "",
        price: "",
        location: "Location 1"
      });
    }
  };

  return (
    <form className="coffee-form" onSubmit={handleSubmit}>
      <h2>{editingCoffee ? "Edit Coffee" : "Add New Coffee"}</h2>

      <label htmlFor="name">Coffee Name</label>
      <input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="origin">Origin</label>
      <input
        id="origin"
        name="origin"
        value={formData.origin}
        onChange={handleChange}
        required
      />

      <label htmlFor="price">Price (Ksh)</label>
      <input
        id="price"
        name="price"
        type="number"
        min="0"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="location">Location</label>
      <select
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      >
        <option>Location 1</option>
        <option>Location 2</option>
        <option>Location 3</option>
        <option>Location 4</option>
      </select>

      <button type="submit">
        {editingCoffee ? "Save Changes" : "Add Coffee"}
      </button>

      {editingCoffee && (
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default CoffeeForm;
