
import { addElement } from '../../actions/testPageActions';
import { deleteElement } from '../../actions/testPageActions';
import { showElements } from '../../actions/testPageActions';
import { toggleListLoading } from '../../actions/testPageActions';
import { toggleErrorListLoading } from '../../actions/testPageActions';
import { fetchItems } from '../../actions/testPageActions';

import { connect } from 'react-redux';

import TemporaryPage from './temporaryPage';

const mapStateToProps = (state) => {

    return {
        stateArray: state.stateArray,
        isListLoading: state.stateUpdateStatus.isListLoading,
        isErrorListLoading: state.stateUpdateStatus.isErrorListLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickProp: val => dispatch(addElement(val)),
        onElementClickProp: idx => dispatch(deleteElement(idx)),
        onComponentWillMount: (stateArray) => dispatch(showElements(stateArray)),
        onToggleListLoading: () => dispatch(toggleListLoading()),
        onToggleErrorListLoading: () => dispatch(toggleErrorListLoading()),
        fetchData: (url) => dispatch(fetchItems(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryPage);
