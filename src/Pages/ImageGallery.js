import { useEffect, useState, useRef } from "react";
import ImageCard from "../Components/ImageCard";
import Lightbox from "../Components/Lightbox";
import RadioButtonList from "../Components/RadioButtonList";
import ImageService from "../Services/ImageService";
import "./ImageGallery.scss";

export default function ImageGallery() {
  const images = useRef([]);
  const [image, setImage] = useState();
  const [isReady, setIsReady] = useState(false);
  const [hasNextData, setHasNextData] = useState(true);
  const [page, setPage] = useState(1);
  const searchRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("relevant");
  const [color, setColor] = useState();
  const [orientation, setOrientation] = useState();
  const isLightBoxShown = useRef(false);
  const [isFilterShown, setIsFilterShown] = useState(false);
  function reset() {
    images.current = [];
    setPage(1);
    setHasNextData(true);
    setIsReady(false);
  }

  function handleSort(value) {
    reset();
    setSort(value);
  }
  function handleChangeColor(value) {
    reset();
    setColor(value);
  }

  function handleChangeOrientation(value) {
    reset();
    setOrientation(value);
  }
  const radioList = [
    {
      title: "sort by",
      handleClick: handleSort,
      items: [
        {
          title: "Relevance",
          value: "relevant",
        },
        { title: "Newest", value: "latest" },
      ],
    },
    {
      title: "color",
      handleClick: handleChangeColor,

      items: [
        { title: "Any Color" },
        {
          title: "Black and White",
          value: "black_and_white",
        },
      ],
    },
    {
      title: "orientation",
      handleClick: handleChangeOrientation,
      items: [
        { title: "Any" },
        {
          title: "Landscape",
          value: "landscape",
        },
        {
          title: "Portrait",
          value: "portrait",
        },
        {
          title: "Square",
          value: "squarish",
        },
      ],
    },
  ];

  function onSearchSubmit(e) {
    e.preventDefault();
    reset();
    setSearchQuery(searchRef.current[0].value);
  }

  function showLightbox(item) {
    setImage(item);
    isLightBoxShown.current = true;
  }

  function hideLightbox() {
    setImage();
    isLightBoxShown.current = false;
  }

  function toggleFilter() {
    setIsFilterShown(!isFilterShown);
  }

  //infinite scrolling method
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (hasNextData) {
      setIsReady(false);
      ImageService.getImages(searchQuery, page, { color, orientation }, sort)
        .then(({ data }) => {
          const newImages = data.results ? data.results : data;
          images.current = [...images.current, ...newImages];
          localStorage.setItem("images", JSON.stringify(newImages));
          if (newImages.length === 0) {
            setHasNextData(false);
          }
        })
        .catch((e) => {
          console.error(e);
          if (images.current.length < 1) {
            images.current = JSON.parse(localStorage.getItem("images"));
          }
          setHasNextData(false);
        })
        .finally(() => {
          setIsReady(true);
        });
    }
  }, [searchQuery, page, color, orientation, sort, hasNextData]);

  return (
    <>
      <div className="search-container">
        <form
          ref={searchRef}
          className="image-search"
          onSubmit={onSearchSubmit}
        >
          <input placeholder="Search Image" />
        </form>
        <button onClick={toggleFilter}>
          <span>Filter</span>
        </button>
      </div>

      <div className={`radio-container ${!isFilterShown ? "hidden" : ""}`}>
        {radioList.map((radio, i) => (
          <RadioButtonList key={i} optionList={radio} />
        ))}
      </div>

      <ul className="image-gallery">
        <ImageCard
          images={images.current}
          showLightbox={showLightbox}
          isReady={isReady}
        />
        {!isReady && <p>Loading...</p>}
      </ul>
      {image && (
        <Lightbox
          isLightBoxShown={isLightBoxShown.current}
          image={image}
          hideLightbox={hideLightbox}
        />
      )}
    </>
  );
}
