import { usePageData } from '@runtime';
import { Nav } from '../components/Nav';
import 'uno.css';
import '../styles/base.css';
import '../styles/vars.css';
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
  return (
    <div>
      <Nav />
    </div>
  );
}
