import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreatePage from "./CreatePage";

describe("CreatePage", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the product form", () => {
    render(<CreatePage />);

    expect(screen.getByRole("heading", { name: "Create A New Product" })).toBeInTheDocument();
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Product" })).toBeInTheDocument();
  });

  it("requires a product name", () => {
    render(<CreatePage />);

    fireEvent.click(screen.getByRole("button", { name: "Create Product" }));

    expect(window.alert).toHaveBeenCalledWith("Please enter a product name");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("creates a product and clears the form after success", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, name: "Keyboard" }),
    });

    render(<CreatePage />);
    const nameInput = screen.getByLabelText("Name:");
    fireEvent.change(nameInput, { target: { value: "Keyboard" } });
    fireEvent.click(screen.getByRole("button", { name: "Create Product" }));

    expect(await screen.findByRole("button", { name: "Creating Product..." })).toBeDisabled();
    await waitFor(() => expect(nameInput).toHaveValue(""));
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Keyboard" }),
    });
    expect(window.alert).toHaveBeenCalledWith('Product "Keyboard" created successfully!');
  });
});