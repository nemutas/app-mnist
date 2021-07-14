import React from 'react';
import { css } from '@emotion/css';
import { Grid } from '@material-ui/core';
import { Canvas } from './Canvas';
import { InputPreviewCanvas } from './InputPreviewCanvas';
import { PredButton } from './PredButton';
import { PredList } from './PredList';
import { ResetButton } from './ResetButton';

export const MainLayout: React.FC = () => {
	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6}>
				<div className={sCanvasContainer}>
					<Canvas />
					<div className={sControllerContainer}>
						<PredButton />
						<ResetButton />
						<InputPreviewCanvas />
					</div>
				</div>
			</Grid>
			<Grid item xs={12} sm={6}>
				<div className={sListContainer}>
					<PredList />
				</div>
			</Grid>
		</Grid>
	);
};

const sCanvasContainer = css`
	width: 300px;
	margin: auto;
`;

const sControllerContainer = css`
	display: grid;
	grid-template-columns: 1fr 1fr auto;
	align-items: center;
	grid-gap: 10px;
`;

const sListContainer = css`
	width: 300px;
	margin: auto;
`;
