import { makeAutoObservable } from 'mobx';
import {
  getFromLocalStorage,
  LOCAL_STORE_KEY,
  removeUserDataFromLocalStorage,
  saveToLocalStorage,
} from 'shared/utils/localStorage';
import { User } from 'graphql/commonTypes';

enum SignStatusEnum {
  signIn,
  signUp,
}

class Profile {
  constructor() {
    makeAutoObservable(this);
    this.getUserFromLocal();
  }

  user: User | null = null;

  isOpenLoginDialog = false;

  signStatus = SignStatusEnum.signIn;

  get isSignIn() {
    return this.signStatus === SignStatusEnum.signIn;
  }

  get isSignUp() {
    return this.signStatus === SignStatusEnum.signUp;
  }

  openLoginDialog = () => {
    this.isOpenLoginDialog = true;
  };

  openSignIn = () => {
    this.openLoginDialog();
    this.signStatus = SignStatusEnum.signIn;
  };

  openSignUp = () => {
    this.openLoginDialog();
    this.signStatus = SignStatusEnum.signUp;
  };

  closeLoginDialog = () => {
    this.isOpenLoginDialog = false;
  };

  signIn = async () => {};

  getUserFromLocal = () => {
    const user = getFromLocalStorage(LOCAL_STORE_KEY.user);
    if (user) {
      this.user = user;
    }
  };

  setProfile = (user?: User | null) => {
    if (!user) {
      return;
    }
    const nextUser = {
      ...this.user,
      ...user,
    } as User;
    this.user = nextUser;
    saveToLocalStorage(LOCAL_STORE_KEY.user, nextUser);
  };

  logout = () => {
    this.user = null;
    removeUserDataFromLocalStorage();
  };
}

export default Profile;
