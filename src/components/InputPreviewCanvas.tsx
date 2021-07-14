import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { inputImageDataState } from '../store/state';

const inputImageSize = 28;

export const InputPreviewCanvas: React.FC = () => {
	const inputImageData = useRecoilValue(inputImageDataState);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return;
		const context = canvasRef.current.getContext('2d')!;

		if (inputImageData) {
			context.putImageData(inputImageData, 0, 0);
		} else {
			context.clearRect(0, 0, inputImageSize, inputImageSize);
		}
	}, [inputImageData]);

	return (
		<canvas
			ref={canvasRef}
			style={{ backgroundColor: 'black' }}
			width={inputImageSize}
			height={inputImageSize}></canvas>
	);
};
