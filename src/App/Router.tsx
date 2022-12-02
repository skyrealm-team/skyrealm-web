import React, { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from 'components/Loading';

const Home = lazy(() => import('pages/Home'));
const ResetPassword = lazy(() => import('pages/ResetPassword'));

const Router: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/reset-password'} element={<ResetPassword />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
