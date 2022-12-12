import { createGlobalState } from "react-use";

const useOpen = createGlobalState({
  signupDialog: false,
  signinDialog: false,
  forgotPasswordDialog: false,
});

export default useOpen;
