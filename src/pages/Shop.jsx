
import { useState } from "react";
import CoffeeCard from "../components/CoffeeCard";

function Shop({ coffees, loading, error }) {
  const [search, setSearch] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);

  const locations = [
    "Location 1",
    "Location 2",
    "Location 3",
    "Location 4"
  ];

  const handleLocationChange = (location) => {
    setSelectedLocations((current) =>
      current.includes(location)
        ? current.filter((item) => item !== location)
        : [...current, location]
    );
  };

  const filteredCoffees = coffees.filter((coffee) => {
    const term = search.toLowerCase();

    const matchesSearch =
      coffee.name.toLowerCase().includes(term) ||
      coffee.description.toLowerCase().includes(term) ||
      coffee.origin.toLowerCase().includes(term);

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(coffee.location);

    return matchesSearch && matchesLocation;
  });

  return (
    <main className="shop-layout">
      <aside className="filters">
        <h2>Find Coffee</h2>

        <input
          type="search"
          placeholder="Search coffee..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <h3>Locations</h3>

        {locations.map((location) => (
          <label className="location-option" key={location}>
            <input
              type="checkbox"
              checked={selectedLocations.includes(location)}
              onChange={() => handleLocationChange(location)}
            />
            {location}
          </label>
        ))}
      </aside>

      <section className="products-section">
        <h1>Our Coffee Collection</h1>

        {loading && <p>Loading coffee products...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && filteredCoffees.length === 0 && (
          <p>No coffee products found.</p>
        )}

        <div className="coffee-grid">
          {filteredCoffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Shop;
