import {createContext} from "../snowpack/pkg/react.js";
const voteContextDefVal = {
  loading: false,
  setLoading: () => {
  },
  success: void 0,
  setSuccess: () => {
  }
};
export const VoteLoadingContext = createContext(voteContextDefVal);
