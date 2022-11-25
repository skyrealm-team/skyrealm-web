import { createContext, useContext } from 'react';
import Profile from './Profile';

class Root {
  profileStore: Profile;
  constructor() {
    this.profileStore = new Profile();
  }
}

export const rootStore = new Root();

const context = createContext<Root>(rootStore);

export const RootStoresProvider = context.Provider;

export const useRootStores = () => {
  return useContext(context);
};
