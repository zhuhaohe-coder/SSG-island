import { UserConfig as ViteConfiguration } from 'vite';

export interface NavItemWithLink {
  text: string;
  link: string;
}

export interface SideBarGroup {
  text: string;
  items: SideBarItem[];
}

export interface SideBarItem {
  text: string;
  link: string;
}

export interface Sidebar {
  [path: string]: SideBarGroup[];
}

export interface Footer {
  message: string;
}

export interface ThemeConfig {
  nav?: NavItemWithLink[];
  sidebar?: Sidebar;
  footer?: Footer;
}

export interface UserConfig {
  title?: string;
  description?: string;
  themeConfig?: ThemeConfig;
  vite?: ViteConfiguration;
}

export interface SiteConfig {
  root: string;
  configPath: string;
  siteData: UserConfig;
}
