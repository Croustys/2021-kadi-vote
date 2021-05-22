import axios from 'axios';
const URL = `http://localhost:5000/api/v1/vote/add`;

export const postVote = async (
  vote: string,
  email: string,
): Promise<boolean> => {
  try {
    const res = await axios.post(URL, { vote, email });
    return res.status === 200;
  } catch (error) {
    return error.status.code;
  }
};
