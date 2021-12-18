import axios from "axios";
import { APP_KEY } from "../Constants/constants";
import ImageService from "./ImageService";

describe("ImageService", () => {
  describe("getImages", () => {
    it("calls axios API with correct params", () => {
      //given
      jest.spyOn(axios, "get");

      //when
      ImageService.getImages();

      //then
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.unsplash.com/photos",
        {
          params: {
            client_id: APP_KEY,
            per_page: 36,
          },
        }
      );
    });
  });
});
