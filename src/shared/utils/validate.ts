import validator from 'validator';

export const validateRequireCreator = (label: string) => {
  return (str: string) => {
    if (validator.isEmpty(str)) {
      return `${label} is Required`;
    }
    return '';
  };
};
export const validateRequire = (str: string, label: string) => {
  if (validator.isEmpty(str)) {
    return `${label} is Required`;
  }
  return '';
};

export const validateEmail = (email: string) => {
  if (validator.isEmpty(email)) {
    return 'Email is required';
  }
  if (!validator.isEmail(email)) {
    return 'Email is invalid';
  }
  return '';
};

export const validatePassword = (password: string) => {
  if (validator.isEmpty(password)) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Use 6 characters or more for your password';
  }
  return '';
};

export const validatePhoneNum = (phoneNum: string) => {
  if (validator.isEmpty(phoneNum)) {
    return '';
  }
  if (!validator.isMobilePhone(phoneNum)) {
    return 'Phone number is invalid';
  }
  return '';
};
