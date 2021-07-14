import { atom } from 'recoil';

export const contextState = atom<CanvasRenderingContext2D | null>({
	key: 'state/context',
	default: null
});

export const scoreState = atom<number[]>({
	key: 'state/score',
	default: [...Array(10)].map(_ => 0)
});

export const inputImageDataState = atom<ImageData | null>({
	key: 'state/inputimagedata',
	default: null
});
