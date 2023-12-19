import { usePageData } from '@runtime';
import 'uno.css';
export function Layout() {
  const pageData = usePageData();
  // 获取 pageType
  const { pageType } = pageData;
  // 根据 pageType 分发不同的页面内容
  const getContent = () => {
    if (pageType === 'Home') return <div>Home 页面</div>;

    if (pageType === 'doc') return <div>正文页面</div>;

    return <div>404 页面</div>;
  };
  return <div>{getContent()}</div>;
}
