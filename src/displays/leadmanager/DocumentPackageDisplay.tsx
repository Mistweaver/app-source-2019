import React from 'react';
import { DocumentPackage } from './DocumentPackage';
import { returnReadableState } from '../../data/staticdata';

interface DocumentPackageDisplayProps {
	documentPackage: DocumentPackage;
}

interface DocumentPackageDisplayState {}

class DocumentPackageDisplay extends React.Component<DocumentPackageDisplayProps, DocumentPackageDisplayState> {
	constructor(props: DocumentPackageDisplayProps) {
		super(props);
		this.state = {}
	}

	public render() {
		const { documentPackage } = this.props;
		return(
			<div>
				<div style={{display: 'flex', fontSize: '10pt', padding: 5, backgroundColor: '#3C4953', color: "#BAD2D7"}}>
					<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
						<span style={{fontWeight: 650}}>Purchase Agreement</span>
					</div>
					<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
						<span>{new Date(documentPackage.agreement.creationTime).toLocaleDateString()}</span>
					</div>
					<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
						<span>{new Date(documentPackage.agreement.modificationTime).toLocaleString()}</span>
					</div>
					<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
						<span>{documentPackage.agreement.deliveryState}</span>
					</div>
					<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
						<span>{returnReadableState(documentPackage.agreement.status)}</span>
					</div>
				</div>
				
				<div style={{display: 'flex', flexDirection: 'column', padding: 10}}>
					{
						documentPackage.changeOrders.map(order => (
							<div style={{display: 'flex', fontSize: '10pt', padding: 5}}>
								<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
									{"Change Order " + order.changeOrderNumber}
								</div>
								<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
								<span>{new Date(order.creationTime).toLocaleDateString()}</span>
								</div>
								<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
									<span>{new Date(order.modificationTime).toLocaleString()}</span>
								</div>
								<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
									<span></span>
								</div>
								<div style={{width: "20%", display: 'flex', flexDirection: 'column'}}>
									<span>{returnReadableState(order.status)}</span>
								</div>
							</div>
						))
					}
				</div>
			</div>
		)
	}
}

export default DocumentPackageDisplay