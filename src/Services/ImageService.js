import axios from "axios";
import { APP_KEY } from "../Constants/constants";

export default class ImageService {
  static getImages(query, page = 1) {
    const params = {
      query,
      client_id: APP_KEY,
      per_page: 30,
      page,
    };
    const url = query
      ? "https://api.unsplash.com/search/photos"
      : "https://api.unsplash.com/collections/2423569/photos";
    return axios.get(url, { params });
  }

  static getImageDetail(id) {
    const params = {
      client_id: APP_KEY,
    };
    const url = `https://api.unsplash.com/photos/${id}`;
    return axios.get(url, { params });
  }
}
