import { useEffect, useState } from "react";
import ImageService from "../Services/ImageService";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    ImageService.getImages().then(({ data }) => {
      console.log({ data });
      setImages(data);
    });
  }, []);
  return (
    <ul>
      {images.length > 0 ? (
        images.map((image) => (
          <li key={image.id}>
            <img src={image.urls.thumb} alt={image.alt_description} />
          </li>
        ))
      ) : (
        <p>No Images Found</p>
      )}
    </ul>
  );
}
