import { render } from "@testing-library/react";
import ImageCard from "./ImageCard";

describe("ImageCard", () => {
  function renderImages(images = []) {
    return render(<ImageCard images={images} />);
  }
  it("render image card based on images property", () => {
    const stubImages = [
      {
        id: 1,
        urls: { thumb: "stub-thumb-1" },
        alt_description: "stub-alt-1",
      },
      {
        id: 2,
        urls: { thumb: "stub-thumb-2" },
        alt_description: "stub-alt-2",
      },
      {
        id: 3,
        urls: { thumb: "stub-thumb-3" },
        alt_description: "stub-alt-3",
      },
    ];

    const { container } = renderImages(stubImages);

    expect(container.querySelectorAll("li").length).toEqual(3);

    expect(container.querySelector("li img").getAttribute("src")).toEqual(
      "stub-thumb-1"
    );
  });

  it("renders message image not found if there is no image props", () => {
    const { container } = renderImages();
    expect(container.querySelector("p").textContent).toEqual("No Images Found");
  });
});
