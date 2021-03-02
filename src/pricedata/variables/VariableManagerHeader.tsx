import DeleteVariableComponent from "../toolbar/variables/DeleteVariableComponent";
import EditVariableComponent from "../toolbar/variables/EditVariableComponent";
import { Variable } from "./objects/Variable";

interface Props {
    variable: Variable;
    reload: () => void;
}

const VariableManagerHeader = (props: Props) => {
    if(props.variable.id === "") {
        return null;
    } else {
        return(
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11pt', color: 'rgb(186, 210, 215)', backgroundColor: 'rgb(60, 73, 83)', padding: 10}}>
                <div style={{marginTop: 'auto', marginBottom: 'auto'}}>{ props.variable.name + " : " + props.variable.key }</div>
                <div style={{display: 'flex'}}>
                    <EditVariableComponent
                        variable={props.variable}
                        reloadVariables={props.reload}
                    />
                    <DeleteVariableComponent 
                        variable={props.variable}
                        reload={props.reload}
                    />
                </div>
            </div>
        )
    }
}

export default VariableManagerHeader;