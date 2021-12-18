import axios from "axios";
import { APP_KEY } from "../Constants/constants";

export default class ImageService {
  static async getImages(query) {
    const params = {
      query,
      client_id: APP_KEY,
      per_page: 30,
    };
    const url = query
      ? "https://api.unsplash.com/search/photos"
      : "https://api.unsplash.com/collections/2423569/photos";
    return axios.get(url, { params });
  }
}
