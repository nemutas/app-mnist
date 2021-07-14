/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { css } from '@emotion/css';
import { contextState } from '../store/state';

type Coordinates = {
	x: number;
	y: number;
};

export const Canvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [context, setContext] = useRecoilState(contextState);

	useEffect(() => {
		let mouseDown: boolean = false;
		let start: Coordinates = { x: 0, y: 0 };
		let end: Coordinates = { x: 0, y: 0 };

		function handleMouseDown(evt: MouseEvent) {
			mouseDown = true;
			const canvasOffsetLeft = canvasRef.current ? canvasRef.current.offsetLeft : 0;
			const canvasOffsetTop = canvasRef.current ? canvasRef.current.offsetTop : 0;

			start = {
				x: evt.clientX - canvasOffsetLeft,
				y: evt.clientY - canvasOffsetTop
			};

			end = {
				x: evt.clientX - canvasOffsetLeft,
				y: evt.clientY - canvasOffsetTop
			};
		}

		function handleMouseUp(evt: MouseEvent) {
			mouseDown = false;
		}

		function handleMouseMove(evt: MouseEvent) {
			if (mouseDown && context) {
				const canvasOffsetLeft = canvasRef.current ? canvasRef.current.offsetLeft : 0;
				const canvasOffsetTop = canvasRef.current ? canvasRef.current.offsetTop : 0;

				start = {
					x: end.x,
					y: end.y
				};

				end = {
					x: evt.clientX - canvasOffsetLeft,
					y: evt.clientY - canvasOffsetTop
				};

				// Draw our path
				context.beginPath();
				context.moveTo(start.x, start.y);
				context.lineTo(end.x, end.y);
				context.strokeStyle = 'white';
				context.lineWidth = 25;
				context.lineCap = 'round';
				context.stroke();
				context.closePath();
			}
		}

		if (canvasRef.current) {
			const renderCtx = canvasRef.current.getContext('2d');

			if (renderCtx) {
				canvasRef.current.addEventListener('mousedown', handleMouseDown);
				canvasRef.current.addEventListener('mouseup', handleMouseUp);
				canvasRef.current.addEventListener('mousemove', handleMouseMove);

				setContext(renderCtx);
			}
		}

		return function cleanup() {
			if (canvasRef.current) {
				canvasRef.current.removeEventListener('mousedown', handleMouseDown);
				canvasRef.current.removeEventListener('mouseup', handleMouseUp);
				canvasRef.current.removeEventListener('mousemove', handleMouseMove);
			}
		};
	}, [context]);

	// =============================================

	return <canvas ref={canvasRef} className={sCanvas} width={300} height={300}></canvas>;
};

const sCanvas = css`
	background-color: black;
`;
