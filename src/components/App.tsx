import React from 'react';
import { css } from '@emotion/css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { MainLayout } from './MainLayout';

export const App: React.FC = () => {
	const theme = createTheme({
		palette: {
			type: 'dark'
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<div className={sContainer}>
				<div className={sCardContainer}>
					<MainLayout />
				</div>
			</div>
		</ThemeProvider>
	);
};

const sCardContainer = css`
	width: 620px;
	padding: 20px;
	margin: 20px;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 10px;
`;

const sContainer = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-image: url('https://images.unsplash.com/photo-1573220322218-a350fe275a24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1188&q=80');
	background-size: cover;
	background-position: center;
`;
