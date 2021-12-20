import { fireEvent, render } from "@testing-library/react";
import RadioButtonList from "./RadioButtonList";

describe("RadioButtonList", () => {
  const handleClick = jest.fn();
  const stubRadioList = {
    title: "sort by",
    handleClick,
    items: [
      {
        title: "Relevance",
        value: "relevant",
      },
      { title: "Newest", value: "latest" },
    ],
  };

  function renderRadio() {
    return render(<RadioButtonList optionList={stubRadioList} />);
  }
  it("render radio button list according to the items and call the function when clicked", () => {
    const { container } = renderRadio();

    expect(container.querySelectorAll("li").length).toEqual(2);
    expect(container.querySelector("h4").textContent).toEqual("sort by");
    expect(container.querySelector("label").textContent).toEqual("Relevance");

    fireEvent.click(container.querySelector("li input"));

    expect(handleClick).toHaveBeenCalledWith("relevant");
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelector("li input"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
