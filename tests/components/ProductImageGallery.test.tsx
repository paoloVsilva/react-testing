import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing when the image list is empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render a list of images", () => {
    const urls = ["url1", "url2"];
    render(<ProductImageGallery imageUrls={urls} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(urls.length);
    urls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});
