import { useState } from 'react';

export const useModal = () => {
	const [render, setRender] = useState(false)

	function toggle() {
		setRender(!render);
	}

	return { render, toggle };
}