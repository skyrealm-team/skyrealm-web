import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from 'components/Loading';
import configs from './configs';

const Router = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          {configs.map(({ path, Component }, index) => {
            return <Route key={index} path={path} element={<Component />}></Route>;
          })}
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;
