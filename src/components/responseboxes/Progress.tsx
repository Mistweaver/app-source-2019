import "./Progress.css";

interface ProgressProps {
    progress: any;
}

const Progress = (props: ProgressProps) => {
    return (
      	<div className="ProgressBar">
			<div className="Progress" style={{ width: props.progress + "%" }} />
		</div>
    );
}

export default Progress;