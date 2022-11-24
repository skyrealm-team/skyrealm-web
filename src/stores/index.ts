import { createContext, useContext } from 'react';
import User from './User';

class Root {
  user: User;
  constructor() {
    this.user = new User();
  }
}

export const rootStore = new Root();

const context = createContext<Root>(rootStore);

export const RootStoresProvider = context.Provider;

export const useRootStores = () => {
  return useContext(context);
};
