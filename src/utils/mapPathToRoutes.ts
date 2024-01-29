import { TRoute, TRouteSideBarPath } from '../types/route.path';

const mapPathToRoutes = (paths: TRouteSideBarPath[]): TRoute[] => {
  return paths.map((item) => ({ path: item.path, element: item.element }));
};

export default mapPathToRoutes;
