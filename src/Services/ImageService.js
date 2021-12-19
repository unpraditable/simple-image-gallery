import axios from "axios";
import { APP_KEY } from "../Constants/constants";

export default class ImageService {
  static getImages(
    query,
    page = 1,
    filters = { color: undefined, orientation: undefined },
    orderBy = "relevant"
  ) {
    const collectionParams = {
      client_id: APP_KEY,
      per_page: 30,
      page,
    };

    const searchParams = {
      ...collectionParams,
      query,
      order_by: orderBy,
      color: filters.color,
      orientation: filters.orientation,
    };

    const params = query ? searchParams : collectionParams;
    const url = query
      ? "https://api.unsplash.com/search/photos"
      : "https://api.unsplash.com/collections/2423569/photos";
    return axios.get(url, { params });
  }
}
