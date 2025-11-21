export interface MenuItem {
  id: number;
  titleKey: string;
  title: string;
  icon: string;
  route: string;
  path: string;
  orderIndex: number;
  children: MenuItem[];
  requiredPermission: string | null;
  allowedRoles: string[];
  parentId: number | null;
  isRootItem: boolean;
  hasChildren: boolean;
}

export interface MenuResponse {
  menuItems: MenuItem[];
}
