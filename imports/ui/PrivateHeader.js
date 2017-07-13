import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';

const PrivateHeader = (props) => {
  return(
    <div className="header">
      <div className="header__content">
        <Link to="/"><h1 className="header__title">{props.title}</h1></Link>
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  );
}

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default PrivateHeader;
