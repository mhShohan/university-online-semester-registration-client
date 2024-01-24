import { TRouteSideBarPath, TSideBarItems } from "../types/route.path";

const mapPathToSidebarItem = (paths: TRouteSideBarPath[]): TSideBarItems[] => {
  return paths.map((item) => ({ id: item.id, link: item.path, name: item.name }));
};

export default mapPathToSidebarItem
