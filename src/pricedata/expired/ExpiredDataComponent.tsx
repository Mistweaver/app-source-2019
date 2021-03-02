import { LinearProgress } from '@material-ui/core';
import React from 'react';
import { FormatNumberAsMoney } from '../../utilities/FormatNumberAsMoney';
import { getExpiredData } from '../data/PriceDataServices';
import { PriceData } from '../objects/PriceData';

interface State {
    expiredData: PriceData[];
    loading: boolean;
}

class ExpiredDataComponent extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expiredData: [],
            loading: false
        }
    }

    componentDidMount() {
        this.loadExpiredData();
    }

    private loadExpiredData() {
        this.setState({ loading: true });
        getExpiredData().then(res => {
            this.setState({ loading: false });
            this.setState({ expiredData: res.data._embedded.pricedata });
        })
    }

    public render() {
        if(this.state.loading) {
            return(
                <div style={{padding: 10}}><LinearProgress /></div>
            )
        } else {
            return(
                <div>
                    <table style={{width: '100%', fontSize: '10pt', borderSpacing: 0}}>
                            <thead>
                                <tr style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Status</th>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Name</th>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Model No.</th>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Manufacturer</th>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Type</th>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>WxL</th>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Created On</th>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Draft Date</th>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Exp Date</th>
                                    <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.expiredData.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.status}</td>
                                            <td>{data.name}</td>
                                            <td>{data.model ? data.model.modelNumber : "#ERR"}</td>
                                            <td>{data.model ? data.model.factoryId : "#ERR"}</td>
                                            <td>{data.model  ? data.model.type : "#ERR"}</td>
                                            <td>{data.model  ? data.model.width + "x" + data.model.length1 + ( data.model.length2 === 0 ? "" : "x" + data.model.length2) : "#ERR"}</td>
                                            <td>{new Date(data.creationTime).toLocaleDateString()}</td>
                                            <td>{data.activeDate}</td>
                                            <td>{data.expirationDate}</td>
                                            <td>{FormatNumberAsMoney(data.factoryDirectPrice)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                </div>
            )
        }
    }
}

export default ExpiredDataComponent;