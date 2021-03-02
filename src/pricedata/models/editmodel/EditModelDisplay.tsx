import { Edit } from "@material-ui/icons";
import React from "react";
import ToolbarButton from "../../../components/buttons/ToolbarButton";
import CustomModal from "../../../components/modal/CustomModal";
import { useModal } from "../../../components/modal/useModal"
import { Model } from "../../../objects/models/Model";
import EditModelComponent from "../EditModelForm";

interface Props {
	model: Model;
	reload: () => void;
}

export const EditModelDisplay = (props: Props) => {
	const { render, toggle } = useModal();

	function exit() {
		toggle();
		props.reload();
	}

	return(
		<>
			<ToolbarButton color="orange" tooltipText="Edit Model" onClick={toggle} icon={<Edit />} />
			<CustomModal 
				close={exit}
				render={render}
				title={"Edit Model Number " + props.model.modelNumber}
			>
				<EditModelComponent model={props.model} />
			</CustomModal>
		</>
	)
}