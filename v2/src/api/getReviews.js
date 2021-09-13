import axios from "axios";

export async function getReviews() {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/api/reviews`)
    .then((response) => {
      return response.data.data;
    })
    .then((message) => {
      return message;
    });
}
