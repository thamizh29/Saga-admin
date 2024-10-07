import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';

const NavLogo = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <React.Fragment>
      <div className="navbar-brand header-logo">
        <Link to="/dashboard" className="b-brand">
        <div>
          <Image style={{paddingTop:'10px'}} width={180} className="align-items-center" src="src/assets/images/logo-head.png" alt='logo' rounded />
          </div>
          
        </Link>
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          <span />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
