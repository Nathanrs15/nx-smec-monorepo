export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  permission?: any;
  isChild?: boolean;
  children?: NavItem[];
  isActive?: boolean;
}

export interface NotificationItem {
  displayName: string;
  iconName: string;
  color: string;
}
