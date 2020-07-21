import axios from "axios";
import { BASE_URL, KEY } from "../config/Config";

export default class Api {
  constructor() {
    this.shared = axios.create({
      baseURL: BASE_URL
    });
    this.shared.defaults.headers.common["secret-key"] = KEY;
  }

  async send(param: { method: "GET" | "POST", url: string }) {
    const { method, url } = param;
    return this.shared(url, {
      method
    })
      .then(response => {
        if (response.status == 200) {
          return Promise.resolve(response.data);
        }
        return Promise.reject("UnExpected");
      })
      .catch(error => {
        return Promise.reject("Error");
      });
  }
}
