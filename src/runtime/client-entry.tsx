import { createRoot } from 'react-dom/client';
import { App, initPageData } from './App';
import siteData from 'island:site-data';
import { BrowserRouter } from 'react-router-dom';
import { DataContext } from './hooks';

async function renderInBrowser() {
  console.log(siteData);
  const containerEl = document.getElementById('root');
  const pageData = await initPageData(location.pathname);

  if (!containerEl) {
    throw new Error('#root element not found');
  }
  createRoot(containerEl).render(
    <DataContext.Provider value={pageData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext.Provider>
  );
}

renderInBrowser();
