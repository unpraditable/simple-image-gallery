import { fireEvent, render } from "@testing-library/react";
import ImageCard from "./ImageCard";

describe("ImageCard", () => {
  const stubShowLightbox = jest.fn();
  function renderImages(images = []) {
    return render(
      <ImageCard
        images={images}
        showLightbox={stubShowLightbox}
        isReady={true}
      />
    );
  }
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
  it("render image card based on images property", () => {
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

  it("calls showLightBox with id as param if item is clicked", () => {
    const { container } = renderImages(stubImages);

    const listItem = container.querySelector("li");
    fireEvent.click(listItem);

    expect(stubShowLightbox).toHaveBeenCalledWith({
      alt_description: "stub-alt-1",
      id: 1,
      urls: { thumb: "stub-thumb-1" },
    });
  });
});
