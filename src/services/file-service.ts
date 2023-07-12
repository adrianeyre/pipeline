import IIFileService from './interfaces/file-service';

import level01 from '../levels/level01.json';

const levels = {
	1: level01,
} as any

export default class IFileService implements IIFileService {
	public readFile = async(level: number): Promise<number[][]> => {
		if (level < 1) throw new Error('Level out of range');

		return levels[level];
	}
}
