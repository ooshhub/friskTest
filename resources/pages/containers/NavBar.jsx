/**
 * Left side navbar
 *  
 */

import PropTypes from "prop-types";
import { NavButton } from "../components/NavButton";

export const NavBar = (props) => {

  const handleNavClick = async ({ target }) => {
    const { url, page } = target?.dataset ?? {};
    if (url && page) props.pageChange(url, page);
    else console.warn(`Bad URL or page name from navButton: ${url}, ${page}`);
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="outer">
          <div className="inner">
            <div className="text">48</div>
          </div>
        </div>
      </div>
      <div className="navbuttons">
        {/* link & page should match setup in Layout.jsx */}
        <NavButton link="/api/createPost" page='create' active={props.currentPage} onNavClick={handleNavClick}>Create Post</NavButton>
        <NavButton link="/api/posts" page='list' active={props.currentPage} onNavClick={handleNavClick}>List Posts</NavButton>
        <NavButton link="/api/options" page='options' active={props.currentPage} onNavClick={handleNavClick}>Options</NavButton>
      </div>
    </nav>
  )
}

NavBar.propTypes = {
  defaultRoute: PropTypes.string,
  pageChange: PropTypes.func,
  currentPage: PropTypes.string,
}
