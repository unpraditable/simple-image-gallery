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
            page: 1,
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
            page: 1,
            order_by: "relevant",
          },
        }
      );
    });
  });

  describe("filter", () => {
    it("calls API with filters param (color and orientation)", () => {
      //given
      jest.spyOn(axios, "get");

      //when
      ImageService.getImages("dog", 1, {
        color: "black",
        orientation: "landscape",
      });

      //then
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            client_id: APP_KEY,
            per_page: 30,
            query: "dog",
            page: 1,
            order_by: "relevant",
            color: "black",
            orientation: "landscape",
          },
        }
      );
    });
  });
});
