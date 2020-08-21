import axios from 'axios';

export const postMbti = async(text) => {
    const response = await axios.post('http://localhost:5000/mbti', text);
    console.log(response);
    return response;
}