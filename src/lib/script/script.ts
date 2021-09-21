import { operator, operatorCodeType } from "./operator";

export default class script {
	private _operators: operator[] = [];

	addOperator(code: number, data: Buffer = null) {
		const op: operator = new operator(code, data);
		this._operators.push(op);
	}

	compile(): Buffer {
		const bufferSize = this._operators.reduce((size: number, op) => {
			return size + op.length;
		}, 0);

		const buffer = Buffer.allocUnsafe(bufferSize);
		let offset = 0;

		this._operators.forEach(op => {
			offset = op.write(buffer, offset);
		});

		return buffer;
	}
}
