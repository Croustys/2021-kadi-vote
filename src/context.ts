import { createContext } from 'react';
import type { voteContext } from './interfaces/interfaces';
export const voteLoadingContext = createContext<voteContext | null>(null);
