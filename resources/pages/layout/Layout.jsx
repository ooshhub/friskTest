/**
 * Control main view from Navbar button calls
 */

import { useState } from "react";
import { NavBar } from "../containers/NavBar";
import { List } from "../List";
import { MainView } from "../containers/MainView";
import { CreatePost } from "../CreatePost";
import { Options } from "../Options";

const Layout = () => {

  // Define main page views with API routes.
  // keyname must match page name in matching NavBar => NavButton
  const routes = {
    pages: {
      create: {
        url: '/api/createPost',
        component: CreatePost
      },
      list: {
        url: '/api/posts',
        component: List
      },
      options: {
        url: '/api/options',
        component: Options
      }
    }
  };

  // Control the active page from here
  const [activePage, setActivePage] = useState('create'),
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
