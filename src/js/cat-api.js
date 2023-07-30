import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_71YDGdW5YG9029l02tmlJh0KeRdziT9MNZI2KvwRWS5siHiT5kL3xM37DaH2fyCI";

export function fetchBreeds() {
  const url = "https://api.thecatapi.com/v1/breeds";
  return axios.get(url);
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url);
}