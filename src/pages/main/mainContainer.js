import { selectRecordAction } from './actions';
import MainPage from './main';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

    return {
        selectedItemId: state.selectedItemId
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        onSelectRecord: (id) => dispatch(selectRecordAction(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
