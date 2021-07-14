import React from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/css';
import {
	createStyles, Divider, List, ListItem, ListItemText, makeStyles, Theme
} from '@material-ui/core';
import { scoreState } from '../store/state';

export const PredList: React.FC = () => {
	const classes = useStyles();
	const score = useRecoilValue(scoreState);
	const items = [...Array(10)];

	return (
		<div className={sListContainer}>
			<List className={classes.list}>
				{score.map((s, i) => (
					<div key={i}>
						<ListItem className={classes.item}>
							<ListItemText className={classes.itemNum} primary={i} />
							<div className={sGraphContainer}>
								<div className={sGraph(s * 100)}></div>
								<ListItemText className={classes.itemPer} primary={(s * 100).toFixed(2) + ' %'} />
							</div>
						</ListItem>
						{items.length > i + 1 && <Divider />}
					</div>
				))}
			</List>
		</div>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		list: {
			width: '100%',
			backgroundColor: theme.palette.background.paper,
			padding: 0
		},
		item: {
			display: 'grid',
			gridTemplateColumns: 'auto 1fr',
			padding: 0
		},
		itemNum: {
			padding: '0 20px',
			textAlign: 'center',
			color: theme.palette.text.primary
		},
		itemPer: {
			textAlign: 'left',
			zIndex: 2,
			color: theme.palette.text.primary
		}
	})
);

const sListContainer = css`
	max-width: 300px;
	/* border: 1px solid black; */
`;

const sGraphContainer = css`
	position: relative;
`;

const sGraph = (pred: number) => css`
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 255, 0, 0.2);
	width: ${pred}%;
	height: 100%;
	z-index: 1;
`;
