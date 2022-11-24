import { makeAutoObservable } from 'mobx';

enum SignStatusEnum {
  signIn,
  signUp,
}

class User {
  constructor() {
    makeAutoObservable(this);
  }

  profile = {};

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
}

export default User;
