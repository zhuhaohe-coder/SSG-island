import { NavItemWithLink } from 'shared/types';
import { usePageData } from '@runtime';
import styles from './index.module.scss';
import { SwitchMode } from '../SwitchMode';
export function Nav() {
  const { siteData } = usePageData();

  const nav = siteData.themeConfig.nav || [];

  return (
    <header relative="~" w="full">
      <div
        flex="~"
        items="center"
        justify="between"
        className="px-8 h-14 divider-bottom"
      >
        <a
          href="/"
          className="w-full h-full text-1rem font-semibold flex items-center"
          hover="opacity-60"
        >
          Island.js
        </a>
        <div>
          <div flex="~">
            {nav.map((item) => (
              <MenuItem {...item} key={item.text} />
            ))}
          </div>
        </div>
        {/* {主题切换按钮} */}
        <div before="menu-item-before" flex="~">
          <SwitchMode />
        </div>
        {/* 相关链接 */}
        <div className={styles.socialLinkIcon} before="menu-item-before">
          <a href="/">
            <div className="i-carbon-logo-github w-5 h-5 fill-current"></div>
          </a>
        </div>
      </div>
    </header>
  );
}

export function MenuItem(item: NavItemWithLink) {
  return (
    <div className="text-sm font-medium mx-3 whitespace-nowrap">
      <a href={item.link} className={styles.link}>
        {item.text}
      </a>
    </div>
  );
}
