import axios from "axios";

export async function postReview(data) {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/review`, data)
    .then((response) => {
      return response.data.data;
    })
    .then((message) => {
      return message;
    });
}
