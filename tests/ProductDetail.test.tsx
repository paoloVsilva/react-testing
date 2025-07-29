import { render, screen } from "@testing-library/react";
import ProductDetail from "../src/components/ProductDetail";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";
import { db } from "./mocks/db";

describe("ProductDetail", () => {
  let productId: number;

  beforeAll(() => {
    const product = db.product.create();
    productId = product.id;
  });
  afterAll(() => {
    db.product.deleteMany({ where: { id: { equals: productId } } });
  });

  it("should render the detail of product", async () => {
    const product = db.product.findFirst({
      where: { id: { equals: productId } },
    });
    render(<ProductDetail productId={productId} />);

    expect(
      await screen.findByText(new RegExp(product!.name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(product!.price.toString()))
    ).toBeInTheDocument();
  });

  it("should render message if product not found", async () => {
    server.use(
      http.get("/products/" + productId, () => HttpResponse.json(null))
    );

    render(<ProductDetail productId={productId} />);

    const message = await screen.findByText(/not found/i);
    expect(message).toBeInTheDocument();
  });

  it("should render error for invalid productId", async () => {
    render(<ProductDetail productId={0} />);

    const message = await screen.findByText(/invalid/i);
    expect(message).toBeInTheDocument();
  });

  it("should render an error message when there is an error", async () => {
    server.use(http.get("/products/" + productId, () => HttpResponse.error()));

    render(<ProductDetail productId={productId} />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
