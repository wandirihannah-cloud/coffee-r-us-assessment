
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CoffeeForm from "../components/CoffeeForm";

describe("CoffeeForm", () => {
  it("renders the add coffee form", () => {
    render(
      <CoffeeForm
        onSubmit={vi.fn()}
        editingCoffee={null}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText("Add New Coffee")).toBeInTheDocument();
    expect(screen.getByLabelText("Coffee Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Price (Ksh)")).toBeInTheDocument();
  });

  it("submits the entered coffee details", async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <CoffeeForm
        onSubmit={handleSubmit}
        editingCoffee={null}
        onCancel={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText("Coffee Name"), {
      target: { value: "Mocha Coffee" }
    });

    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Chocolate flavoured coffee" }
    });

    fireEvent.change(screen.getByLabelText("Origin"), {
      target: { value: "Kenya" }
    });

    fireEvent.change(screen.getByLabelText("Price (Ksh)"), {
      target: { value: "1000" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Add Coffee" }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: "Mocha Coffee",
        description: "Chocolate flavoured coffee",
        origin: "Kenya",
        price: 1000,
        location: "Location 1"
      });
    });
  });
});
