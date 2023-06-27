type SidebarItem = {
  name: string;
  link: string;
  icon?: string;
  total: number | string;
};
type Sidebar = {
  categoryList: SidebarItem[];
  folderList: SidebarItem[];
};
export { SidebarItem, Sidebar };
