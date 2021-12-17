import axios from "axios";
import { APP_KEY } from "../Constants/constants";

export default class ImageService {
  static async getImages() {
    const params = {
      client_id: APP_KEY,
      per_page: 24,
    };
    const url = "https://api.unsplash.com/photos";
    return axios.get(url, { params });
  }
}
