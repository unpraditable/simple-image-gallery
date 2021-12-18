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

  describe("getImageDetail", () => {
    it("calls axios API with correct properties when ImageService.getImageDetail called", () => {
      //given
      jest.spyOn(axios, "get");

      //when
      ImageService.getImageDetail(123);

      //then
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.unsplash.com/photos/123",
        {
          params: {
            client_id: APP_KEY,
          },
        }
      );
    });
  });
});
