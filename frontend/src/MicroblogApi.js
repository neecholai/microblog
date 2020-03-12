import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"


class MicroblogApi {

  static async getPost(postId) {
    return (await axios.get(`${BASE_URL}/posts/${postId}`)).data;
  }
  
  static async getTitles() {
    const titlesArray = (await axios.get(`${BASE_URL}/posts`)).data;
    const titles = titlesArray.reduce((titlesObj,title) => {
      const { id, ...titleInfo }  = title;
      titlesObj[id] = titleInfo;
      return titlesObj;
    }, {});
    return titles;
  }
  
}

export default MicroblogApi;