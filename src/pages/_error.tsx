import { NextPage } from "next";
import Error, { ErrorProps } from "next/error";

const MyError: NextPage<ErrorProps> = ({ ...props }) => {
  return <Error withDarkMode={false} {...props} />;
};

MyError.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default MyError;
