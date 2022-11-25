import message from 'components/Message';

export enum LOCAL_STORE_KEY {
  viewerSessionID = 'viewer-session-id',
  accessToken = 'access-token',
  user = 'user',
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

// 15 days
export function saveToLocalStorage(key: LOCAL_STORE_KEY, value: any, expire = 0) {
  let realExpire = 0;
  if (expire) {
    realExpire = Date.now() + expire;
  }
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        // eslint-disable-next-line no-underscore-dangle
        _e: realExpire,
        // eslint-disable-next-line no-underscore-dangle
        _v: value,
      }),
    );
  } catch (error) {
    message.error(
      // eslint-disable-next-line max-len
      "You are using unsupported browser or incognito mode, please change your browser or don't use incognito mode",
    );
  }
}

const parseJSON = (str: string | null) => {
  if (!str) {
    return null;
  }
  if (str === 'undefined') {
    return undefined;
  }
  try {
    const result = JSON.parse(str);
    // eslint-disable-next-line no-underscore-dangle
    if (result._v !== undefined) {
      // eslint-disable-next-line no-underscore-dangle
      return result._v;
    }
    return result;
  } catch (e) {
    return str;
  }
};
export function getFromLocalStorage(key: LOCAL_STORE_KEY) {
  const str = localStorage.getItem(key);
  return parseJSON(str);
}

export function removeUserDataFromLocalStorage() {
  removeFromLocalStorage(LOCAL_STORE_KEY.user);
  removeFromLocalStorage(LOCAL_STORE_KEY.accessToken);
}

const clearByExpire = () => {
  const len = localStorage.length;
  const keys = Array(len)
    .fill(0)
    .map((v, index) => {
      return localStorage.key(index);
    });
  keys.forEach((key) => {
    if (!key) {
      return;
    }
    const value = localStorage.getItem(key);
    const result = parseJSON(value);
    // eslint-disable-next-line no-underscore-dangle
    if (result._e) {
      // eslint-disable-next-line no-underscore-dangle
      if (Date.now() > result._e) {
        localStorage.removeItem(key);
      }
      return;
    }
  });
};
clearByExpire();
