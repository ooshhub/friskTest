import PropTypes from 'prop-types';
import { createElement, createRef, useEffect } from 'react';


export const NavButton = (props) => {

  const additionalClasses = props.classes?.split(/\s+/g),
    classList = ['nav-button', ...additionalClasses||[]];

  const thisNavButton = createRef(null);
  useEffect(() => {
    if (thisNavButton) {
      if (props.link === props.active) thisNavButton.current.classList.add('active');
      else thisNavButton.current.classList.remove('active');
    }
  }, [props.active])

  const navElement = createElement(
    props.as,
    {
      onClick: props.onNavClick,
      className: classList.join(' '),
      "data-url": props.link,
      "data-method": props.method,
      'data-page': props.page,
      ref: thisNavButton,
    },
    props.children
  );

  return (
    navElement
  )
}

NavButton.defaultProps = {
  method: 'get',
  as: 'button',
  label: 'newButton'
}

NavButton.propTypes = {
  as: PropTypes.oneOf(['button', 'a']),
  link: PropTypes.string,
  label: PropTypes.string,
  classes: PropTypes.string,
  method: (props, propName, componentName) => {
    if (!/^(get|post|put|delete)$/i.test(props[propName])) {
      throw new Error(`${componentName}: "action" attribute must be GET/POST/PUT/DELETE`)
    }
  }
}