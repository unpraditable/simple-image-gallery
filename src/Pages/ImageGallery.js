import { useEffect, useState, useRef } from "react";
import ImageCard from "../Components/ImageCard";
import ImageService from "../Services/ImageService";
import "./ImageGallery.scss";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);

  function onSearchSubmit(e) {
    e.preventDefault();
    setIsReady(false);
    setSearchQuery(searchRef.current[0].value);
  }

  function showLightbox(id) {
    ImageService.getImageDetail(id);
    console.log("shown");
  }

  useEffect(() => {
    ImageService.getImages(searchQuery)
      .then(({ data }) => {
        const newImages = data.results ? data.results : data;
        setImages(newImages);
      })
      .finally(() => {
        setIsReady(true);
      });
  }, [searchQuery]);
  return (
    <>
      <form ref={searchRef} className="image-search" onSubmit={onSearchSubmit}>
        <input placeholder="Search Image" />
      </form>
      <ul className="image-gallery">
        {isReady ? (
          <ImageCard images={images} showLightbox={showLightbox} />
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </>
  );
}
