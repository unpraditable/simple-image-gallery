import axios from "axios";
import { APP_KEY } from "../Constants/constants";
import ImageService from "./ImageService";

describe("ImageService", () => {
  describe("getImages", () => {
    it("calls axios API without search query with correct params", () => {
      //given
      jest.spyOn(axios, "get");

      //when
      ImageService.getImages();

      //then
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.unsplash.com/collections/2423569/photos",
        {
          params: {
            client_id: APP_KEY,
            per_page: 30,
          },
        }
      );
    });

    it("calls axios API with search query with correct params", () => {
      //given
      jest.spyOn(axios, "get");

      //when
      ImageService.getImages("dog");

      //then
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            client_id: APP_KEY,
            per_page: 30,
            query: "dog",
          },
        }
      );
    });
  });
});
