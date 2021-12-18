import { useEffect, useState } from "react";
import ImageCard from "../Components/ImageCard";
import ImageService from "../Services/ImageService";
import "./ImageGallery.scss";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    ImageService.getImages()
      .then(({ data }) => {
        setImages(data);
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);
  return (
    <ul className="image-gallery">
      {isReady ? <ImageCard images={images} /> : <p>Loading...</p>}
    </ul>
  );
}
