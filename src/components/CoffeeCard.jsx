
function CoffeeCard({ coffee }) {
  return (
    <article className="coffee-card">
      <div className="coffee-image">
        <span>☕</span>
      </div>

      <h3>{coffee.name}</h3>
      <p>{coffee.description}</p>

      <p>
        <strong>Origin:</strong> {coffee.origin}
      </p>

      <p>
        <strong>Price:</strong> Ksh{" "}
        {Number(coffee.price).toLocaleString()}
      </p>
    </article>
  );
}

export default CoffeeCard;
