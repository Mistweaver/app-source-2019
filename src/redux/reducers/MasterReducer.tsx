import { combineReducers } from "redux";
import application from './ApplicationReducer';
import agreementeditor from './AgreementEditorReducer';
import changeordereditor from './ChangeOrderEditorReducer';
import applicationdata from './AgreementDataReducer';

const appState = combineReducers({
	agreementeditor,
	changeordereditor,
	applicationdata,
	application,
});

export default appState;