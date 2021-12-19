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
  const [hasNextData, setHasNextData] = useState(true);
  const [page, setPage] = useState(1);
  const [storedImageId, setStoredImageId] = useState();
  const searchRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  function onSearchSubmit(e) {
    e.preventDefault();
    setImages([]);
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

      ImageService.getImages(searchQuery, page)
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
  }, [searchQuery, page]);

  return (
    <>
      <form ref={searchRef} className="image-search" onSubmit={onSearchSubmit}>
        <input placeholder="Search Image" />
      </form>
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
