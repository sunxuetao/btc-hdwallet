export const hardened_offset = 0x80000000;

export default class KeyPath {
	private _indexes: number[] = [];

	constructor(path: string) {
		const indexes = path.split("/");
		if (indexes.length < 1 || indexes.length > 255 || indexes[0] != "m") {
			throw new Error("KeyPath uncorrectly formatted");
		} else {
			for (let i = 1; i < indexes.length; i++) {
				this._indexes.push(this._parseIndex(indexes[i]));
			}
		}
	}

	private _parseIndex = (index: string): number => {
		if (index.length == 0) {
			throw new Error("KeyPath uncorrectly formatted");
		}
		const hardened: boolean = index[index.length - 1] === "'";
		const nonhardenedIndex = hardened ? index.substring(0, index.length - 1) : index;

		let intIndex = parseInt(nonhardenedIndex);
		if (!Number.isInteger(intIndex)) {
			throw new Error("KeyPath uncorrectly formatted");
		}

		// when parsing, number equals or greater than 0x80000000 (= 2147483648) should not be allowed.
		if (intIndex >= hardened_offset) {
			throw new Error("KeyPath uncorrectly formatted");
		}
		if (hardened) {
			intIndex = intIndex + hardened_offset;
		}
		return intIndex;
	};

	get indexes(): number[] {
		return this._indexes;
	}
}
