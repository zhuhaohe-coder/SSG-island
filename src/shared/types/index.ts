import { ComponentType } from 'react';
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

export type PageType = 'Home' | 'doc' | '404' | 'custom';

export interface Header {
  id: string;
  text: string;
  depth: number;
}

export interface FrontMatter {
  title?: string;
  description?: string;
  pageType?: PageType;
  sidebar?: boolean;
  outline?: boolean;
}

export interface PageData {
  siteData: UserConfig;
  pagePath: string;
  frontMatter: FrontMatter;
  pageType: PageType;
  toc?: Header[];
}

export interface PageModule {
  default: ComponentType;
  frontmatter?: FrontMatter;
  [key: string]: unknown;
}
