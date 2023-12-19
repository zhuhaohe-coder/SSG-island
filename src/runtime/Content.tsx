import { useRoutes } from 'react-router-dom';

import { routes } from 'island:routes';

// const routes = [
//   {
//     path: '/guide',
//     element: <Index />
//   },
//   {
//     path: '/guide/a',
//     element: <A />
//   },
//   {
//     path: '/b',
//     element: <B />
//   }
// ];

function Content() {
  const routeElement = useRoutes(routes);
  return routeElement;
}

export default Content;
