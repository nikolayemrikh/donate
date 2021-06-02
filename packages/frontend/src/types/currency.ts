export interface Currency {
	name: string;
	code: string;
	symbol: string;
	rate: number
};

export type Presets = Record<Currency['code'], readonly number[]>;