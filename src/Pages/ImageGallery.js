import { useEffect, useState, useRef } from "react";
import ImageCard from "../Components/ImageCard";
import Lightbox from "../Components/Lightbox";
import RadioButtonList from "../Components/RadioButtonList";
import ImageService from "../Services/ImageService";
import "./ImageGallery.scss";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isLightBoxShown, setIsLightBoxShown] = useState(false);
  const [hasNextData, setHasNextData] = useState(true);
  const [page, setPage] = useState(1);
  const [storedImageId, setStoredImageId] = useState();
  const searchRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  const [sort, setSort] = useState("relevant");
  const [color, setColor] = useState();
  const [orientation, setOrientation] = useState();

  function handleSort(value) {
    setImages([]);
    setPage(1);
    setHasNextData(true);
    setIsReady(false);
    setSort(value);
  }
  function handleChangeColor(value) {
    setImages([]);
    setPage(1);
    setHasNextData(true);
    setIsReady(false);
    setColor(value);
  }
  function handleChangeOrientation(value) {
    setImages([]);
    setPage(1);
    setHasNextData(true);
    setIsReady(false);
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
    setImages([]);
    setPage(1);
    setHasNextData(true);
    setIsReady(false);
    setSearchQuery(searchRef.current[0].value);
  }

  function showLightbox(id) {
    setStoredImageId(id);
    setIsLightBoxShown(true);
  }

  function hideLightbox() {
    setImage();
    setStoredImageId();
    setIsLightBoxShown(false);
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
    if (storedImageId) {
      ImageService.getImageDetail(storedImageId, page).then(({ data }) => {
        setImage(data);
      });
    }
  }, [storedImageId]);

  useEffect(() => {
    if (hasNextData) {
      setIsReady(false);

      ImageService.getImages(searchQuery, page, { color, orientation }, sort)
        .then(({ data }) => {
          const newImages = data.results ? data.results : data;
          setImages([...images, ...newImages]);
          console.log(newImages.length);
          if (newImages.length === 0) {
            setHasNextData(false);
          }
        })
        .finally(() => {
          setIsReady(true);
        });
    }
  }, [searchQuery, page, color, orientation, sort]);

  return (
    <>
      <form ref={searchRef} className="image-search" onSubmit={onSearchSubmit}>
        <input placeholder="Search Image" />
      </form>
      {radioList.map((radio) => (
        <RadioButtonList optionList={radio} />
      ))}
      <ul className="image-gallery">
        <ImageCard
          images={images}
          showLightbox={showLightbox}
          isReady={isReady}
        />
        {!isReady && <p>Loading...</p>}
      </ul>
      {image && (
        <Lightbox
          isLightBoxShown={isLightBoxShown}
          image={image}
          hideLightbox={hideLightbox}
        />
      )}
    </>
  );
}
