import { selectRecordAction, pushTableDataAction, deleteRecordAction, addRecordAction, editRecordAction, setModalPropsAction } from './actions';
import MainPage from './main';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

    return {
        selectedItemId: state.selectedItemId,
        currentData: state.pushTableData,
        modalTitle: state.setModalProps.modalTitle,
        modalContent: state.setModalProps.modalContent,
        modalFooter: state.setModalProps.modalFooter,
        modalAction: state.setModalProps.modalAction
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        onSelectRecord: (id) => dispatch(selectRecordAction(id)),
        onShowData: (data) => dispatch(pushTableDataAction(data)),
        onDeleteRecord: (index) => dispatch(deleteRecordAction(index)),
        onAddRecord: (newRecord) => dispatch(addRecordAction(newRecord)),
        onEditRecord: (changedData) => dispatch(editRecordAction(changedData)),
        onSetModalProps: (modalProps) => dispatch(setModalPropsAction(modalProps))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
