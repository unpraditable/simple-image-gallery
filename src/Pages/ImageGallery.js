import { useEffect, useState, useRef } from "react";
import ImageCard from "../Components/ImageCard";
import Lightbox from "../Components/Lightbox";
import ImageService from "../Services/ImageService";
import "./ImageGallery.scss";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isLightBoxShown, setIsLightBoxShown] = useState(false);
  const [storedImageId, setStoredImageId] = useState();
  const searchRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  function onSearchSubmit(e) {
    e.preventDefault();
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

  useEffect(() => {
    if (storedImageId) {
      ImageService.getImageDetail(storedImageId).then(({ data }) => {
        console.log("kepanggil");
        setImage(data);
      });
    }
  }, [storedImageId]);

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
