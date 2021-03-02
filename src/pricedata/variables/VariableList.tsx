import { LinearProgress } from "@material-ui/core";
import React from "react";
import { Variable } from "./objects/Variable";

interface Props {
    loading: boolean;
    variableList: Variable[];
    selectVariable: (variable: Variable) => void;
}

const VariableList = (props: Props) => {
    if(props.loading) {
        return <LinearProgress />
    } else {
        return(
            <div style={{backgroundColor: '#3C4953', width: '100%'}}>
                <div style={{backgroundColor: 'rgb(231, 231, 231)', fontSize: '11pt'}}>
                    <div style={{color: 'rgb(186, 210, 215)', borderBottom: '2px solid rgb(231, 231, 231)', backgroundColor: 'rgb(60, 73, 83)', padding: 10}}>{ props.variableList.length} Variables</div>
                    <div style={{display: 'flex', maxHeight: '70vh', flexDirection: 'column', overflowY: 'scroll', overflowX: 'hidden', }}>
                    {
                        props.variableList.map(variable => (
                            <div key={variable.id} onClick={() => props.selectVariable(variable)} className="buttonMinimal" style={{padding: 2}}>
                                <span style={{wordBreak: 'break-word', color: 'black', fontSize: '9pt'}}>{variable.name}</span>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default VariableList;