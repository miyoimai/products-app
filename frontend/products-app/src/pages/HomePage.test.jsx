import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import HomePage from "./HomePage";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("HomePage", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, name: "Keyboard" },
        { id: 2, name: "Mouse" },
      ],
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the products returned by the API", async () => {
    render(<HomePage />);

    expect(await screen.findByRole("cell", { name: "Keyboard" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Mouse" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "ID" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
  });

  it("links to the create product page", async () => {
    render(<HomePage />);

    const createLink = await screen.findByRole("link", { name: "Create New Product" });
    expect(createLink).toHaveAttribute("href", "/create");
  });
});