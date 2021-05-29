import axios from 'axios';
const DOMAIN = `https://vote2021kadi.herokuapp.com/`;
const PATH = `api/v1/vote/add`;
const URL = `${DOMAIN}${PATH}`;

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
