
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CoffeeCard from "../components/CoffeeCard";

describe("CoffeeCard", () => {
  it("displays coffee product information", () => {
    const coffee = {
      id: "1",
      name: "Arabica Coffee",
      description: "Smooth and rich coffee.",
      origin: "Ethiopia",
      price: 1200
    };

    render(<CoffeeCard coffee={coffee} />);

    expect(screen.getByText("Arabica Coffee")).toBeInTheDocument();
    expect(screen.getByText("Smooth and rich coffee.")).toBeInTheDocument();
    expect(screen.getByText(/Ethiopia/)).toBeInTheDocument();
    expect(screen.getByText(/1,200/)).toBeInTheDocument();
  });
});
