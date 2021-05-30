import { createContext } from 'react';
import type { voteContext } from './interfaces/interfaces';

const voteContextDefVal: voteContext = {
  loading: false,
  setLoading: () => {},
  success: undefined,
  setSuccess: () => {},
};
export const VoteLoadingContext = createContext<voteContext>(voteContextDefVal);
