import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"


class MicroblogApi {

  static async getPost(postId) {
    return (await axios.get(`${BASE_URL}/posts/${postId}`)).data;
  }
  
  static async getTitles() {
    const titles = (await axios.get(`${BASE_URL}/posts`)).data;
    return titles;
  }
  
}

export default MicroblogApi;