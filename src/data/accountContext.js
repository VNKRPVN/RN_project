import { createContext } from 'react';

export const AccountContext = createContext({
  account: null,
  SetAccount: () => {}
});