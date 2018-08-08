import Header from './headerComponent';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        sel: state.selectedItemId
    };
};

export default connect(mapStateToProps)(Header);