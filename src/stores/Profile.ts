import { makeAutoObservable } from 'mobx';
import {
  getFromLocalStorage,
  LOCAL_STORE_KEY,
  removeUserDataFromLocalStorage,
  saveToLocalStorage,
  ONE_DAY_EXPIRE,
} from 'shared/utils/localStorage';
import { EMPTY_RESPONSE, User } from 'graphql/commonTypes';
import graphqlClient from 'graphql/client';
import { LOGOFF, LOGOFF_INPUT } from 'graphql/login';
import Message from 'components/Message';

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

  get isLogin() {
    return !!this.user;
  }

  get isSignIn() {
    return this.signStatus === SignStatusEnum.signIn;
  }

  get isSignUp() {
    return this.signStatus === SignStatusEnum.signUp;
  }

  get shortName() {
    if (!this.user) {
      return '';
    }
    return `${this.user.firstName[0].toUpperCase()}${this.user.lastName[0].toUpperCase()}`;
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
    saveToLocalStorage(LOCAL_STORE_KEY.user, nextUser, ONE_DAY_EXPIRE);
    saveToLocalStorage(LOCAL_STORE_KEY.accessToken, user.authToken);
  };

  logoff = () => {
    const email = this.user?.email || '';
    graphqlClient.mutate<EMPTY_RESPONSE, LOGOFF_INPUT>({
      mutation: LOGOFF,
      variables: {
        email,
      },
    });
    this.user = null;
    removeUserDataFromLocalStorage();
    Message.success('Logout successful');
  };
}

export default Profile;
