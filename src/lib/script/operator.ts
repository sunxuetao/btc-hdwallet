export enum operatorCodeType {
	OP_0 = 0,
	OP_INT_BASE = 80,
	OP_CHECKMULTISIG = 174,
}

export class operator {
	private _code: number;
	private _data: Buffer;

	constructor(code: number, data: Buffer = null) {
		this._code = code;
		this._data = data;
	}

	get code(): number {
		return this._code;
	}

	get data(): Buffer {
		return this._data;
	}

	get length(): number {
		if (this._data != null) {
			return this.data.length + 1;
		} else return 1;
	}

	write(buffer: Buffer, offset: number): number {
		buffer.writeUInt8(this._code, offset);
		offset += 1;

		if (this._data != null) {
			this._data.copy(buffer, offset);
			offset += this._data.length;
		}
		return offset;
	}
}
