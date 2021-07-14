import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Button } from '@material-ui/core';
import { contextState, inputImageDataState, scoreState } from '../store/state';

export const ResetButton: React.FC = () => {
	const context = useRecoilValue(contextState);
	const resetScore = useResetRecoilState(scoreState);
	const resetInputImageData = useResetRecoilState(inputImageDataState);

	const onClickReset = () => {
		if (context) {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		}
		resetScore();
		resetInputImageData();
	};

	return (
		<Button variant="contained" color="secondary" onClick={onClickReset}>
			Reset
		</Button>
	);
};
