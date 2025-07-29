import { render, screen } from "@testing-library/react";
import ProductDetail from "../src/components/ProductDetail";
import { products } from "./mocks/data";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";

describe("ProductDetail", () => {
  it("should render the detail of product", async () => {
    const product = products[0];
    render(<ProductDetail productId={product.id} />);

    expect(
      await screen.findByText(new RegExp(product.name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(product.price.toString()))
    ).toBeInTheDocument();
  });

  it("should render message if product not found", async () => {
    server.use(http.get("/products/1", () => HttpResponse.json(null)));

    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/not found/i);
    expect(message).toBeInTheDocument();
  });

  it("should render error for invalid productId", async () => {
    render(<ProductDetail productId={0} />);

    const message = await screen.findByText(/invalid/i);
    expect(message).toBeInTheDocument();
  });
});
