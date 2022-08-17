/**
 * Container for main page view
 * Page list dictated by Layout.jsx
 */

import PropTypes from "prop-types";
import { createElement, useEffect, useState } from "react";

export const MainView = (props) => {

  const pages = props.pages

  const [currentPage, setCurrentPage] = useState();

  // When Layout changes the activePage, render the main view
  const renderCurrentPage = () => {
    // console.log(`Rendering new mainview...`, props.activePage);
    const page = pages[props.activePage];
    if (page) {
      setCurrentPage(() => {
        const newElement = createElement(
          page.component,
          { pageData: props.pageData },
        );
        return newElement;
      });
    }
  }
  useEffect(() => { renderCurrentPage() }, [props.activePage]);

  return (
    <main>
      {currentPage}
    </main>
  )
}

MainView.propTypes = {
  activePage: PropTypes.string,
  pages: PropTypes.object,
  pageData: PropTypes.any, 
};