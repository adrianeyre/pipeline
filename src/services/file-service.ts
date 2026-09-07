import IIFileService from './interfaces/file-service';

import level01 from '../levels/level01.json';

const levels: Record<number, number[][]> = {
	1: level01,
};

export default class FileService implements IIFileService {
	public readFile = async (level: number): Promise<number[][]> => {
		if (level < 1) throw new Error('Level out of range');

		return levels[level];
	};
}
