const { REACT_APP_ENV } = process.env;

export const envInfo = {
  backendApi: '',
};
if (REACT_APP_ENV === 'development' || REACT_APP_ENV === 'test') {
  envInfo.backendApi = '/gql/schema';
} else if ((REACT_APP_ENV as string) === 'staging') {
  envInfo.backendApi = '/gql/schema';
} else {
  envInfo.backendApi = '/gql/schema';
}

export const isDev = REACT_APP_ENV === 'development';
