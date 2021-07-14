import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from '@material-ui/core';
import * as tf from '@tensorflow/tfjs';
import { contextState, inputImageDataState, scoreState } from '../store/state';

// const mlpModelPath = './assets/mlp/model.json';
const cnnModelPath = './assets/cnn/model.json';

export const PredButton: React.FC = () => {
	const [model, setModel] = useState<tf.LayersModel>();
	const context = useRecoilValue(contextState);
	const setScore = useSetRecoilState(scoreState);
	const setInputImageData = useSetRecoilState(inputImageDataState);

	// Model Load
	useEffect(() => {
		const loadModel = async () => {
			try {
				const loadedModel = await tf.loadLayersModel(cnnModelPath);
				setModel(loadedModel);
			} catch (error) {
				console.error({ error });
			}
		};
		loadModel();
	}, []);

	/**
	 * canvasデータを変換する
	 * @returns 28×28のグレースケール画像データ
	 */
	const convertImageData = () => {
		if (!context) return;

		const inputWidth = 28;
		const inputHeight = 28;

		// resize
		const tmpCanvas = document.createElement('canvas').getContext('2d')!;
		tmpCanvas.drawImage(context.canvas, 0, 0, inputWidth, inputHeight);

		// convert grayscale
		let imageData = tmpCanvas.getImageData(0, 0, inputWidth, inputHeight);
		for (let i = 0; i < imageData.data.length; i += 4) {
			const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
			imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = avg;
		}

		return imageData;
	};

	/**
	 * 推測
	 * @param imageData 28×28のグレースケール画像データ
	 * @returns 結果
	 */
	const predict = (imageData: ImageData) => {
		if (!model) return;

		const score = tf.tidy(() => {
			// convert to tensor (shape: [width, height, channels])
			const channels = 1; // grayscale
			let input = tf.browser.fromPixels(imageData, channels).toFloat();
			// input = input.resizeNearestNeighbor([28, 28]);
			// normalized
			input = input.div(tf.scalar(255));
			// CNN
			// reshape input format (shape: [batch_size, width, height, channels])
			input = input.expandDims();

			// MLP
			// input = input.reshape([1, 784]);
			// input.print();
			// console.log(input.shape);

			// predict
			return model.predict(input);
		});

		const result: number[] = [];

		const datas = Array.isArray(score) ? score[0].dataSync() : score.dataSync();
		datas.forEach(d => result.push(d));

		return result;
	};

	const onClickPrediction = async () => {
		const imageData = convertImageData();
		if (!imageData) return;
		setInputImageData(imageData);

		const score = predict(imageData);
		if (!score) return;

		setScore(score);
	};

	return (
		<Button variant="contained" color="primary" onClick={onClickPrediction}>
			Predict
		</Button>
	);
};
