import { ComponentType, lazy } from 'react';

interface Route {
  path: string;
  Component: ComponentType<any>;
  extra?: boolean;
}

const configs: Route[] = [
  {
    path: '/',
    Component: lazy(() => import(/* webpackChunkName: "home" */ 'pages/Home')),
  },
];

export default configs;
