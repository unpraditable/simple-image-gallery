import { fireEvent, render } from "@testing-library/react";
import Lightbox from "./Lightbox";

describe("Lightbox", () => {
  const stubImage = {
    user: {
      name: "Alfred Sinaga",
    },
    urls: {
      regular: "stub-url",
    },
    alt_description: "stub-alt",
    description: "stub-description",
  };
  const stubHideLightbox = jest.fn();
  const renderLightbox = (isLightBoxShown, image) => {
    return render(
      <Lightbox
        isLightBoxShown={isLightBoxShown}
        image={image}
        hideLightbox={stubHideLightbox}
      />
    );
  };
  it("does not render Lightbox if isLightBoxShown is not defined", () => {
    const { container } = renderLightbox(false);

    expect(container.querySelector(".lightbox")).not.toBeInTheDocument();
  });
  it("does render Lightbox", () => {
    const { container } = renderLightbox(true, stubImage);

    expect(container.querySelector(".lightbox")).toBeInTheDocument();

    expect(container.querySelector(".lightbox header p").textContent).toEqual(
      "Alfred Sinaga"
    );

    expect(
      container.querySelector(".lightbox__image img").getAttribute("src")
    ).toEqual("stub-url");

    expect(
      container.querySelector(".lightbox__image img").getAttribute("alt")
    ).toEqual("stub-alt");
    expect(
      container.querySelector(".lightbox__description p").textContent
    ).toEqual("stub-description");

    fireEvent.click(container.querySelector(".lightbox"));
    expect(stubHideLightbox).toHaveBeenCalled();
  });
});
