import { useState } from "react";
import { NavBar } from "../containers/NavBar";
import { Dashboard } from "../Dashboard";
import { List } from "../List";
import { MainView } from "../containers/MainView";

const Layout = () => {

  // const navigateRoute = useNavigate();
  const routes = {
    pages: {
      dashboard: {
        url: '/dashboard',
        component: Dashboard
      },
      list: {
        url: '/api/posts',
        component: List
      },
    }
  };

  // Control the active page from here
  const [activePage, setActivePage] = useState('dashboard'),
    [activePageData, setActivePageData] = useState(null);

  // Change the active page
  const handlePageChange = async (pageUrl, pageName) => {
    const response = await window.ooxios.getRequest({ url: pageUrl, page: pageName });
    console.info(response);
    if (routes.pages[pageName]?.url === response.config.url) {
      setActivePageData(response.data);
      setActivePage(pageName);
    }
    else console.warn(pageName, routes.pages[pageName], response.config.url);
  }

  return (
    <>
      <NavBar pageChange={handlePageChange} defaultRoute='/' currentPage={activePage}/>
      <MainView activePage={activePage} pages={routes.pages} pageData={activePageData}/>
    </>
  )
}
export default Layout;
