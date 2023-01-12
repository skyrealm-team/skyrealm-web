import { createGlobalState } from "react-use";

const useOpens = createGlobalState({
  signupDialog: false,
  signinDialog: false,
  forgotPasswordDialog: false,
  menuDrawer: false,
});

export default useOpens;
