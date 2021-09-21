import { operator, operatorCodeType } from "./operator";

describe("operator", () => {
	const code = operatorCodeType.OP_CHECKMULTISIG;
	const codeInHex = "ae";
	const data = Buffer.from(
		"032bbe706d55621bff557f2f711c8f587d903707703ea92974cfe534b5ddbd353f",
		"hex",
	);

	describe("length", () => {
		it("should return correct length with data", async () => {
			const operatorWithData = new operator(code, data);
			expect(operatorWithData.length).toBe(data.length + 1);
		});
		it("should return correct length without data", async () => {
			const operatorWithoutData = new operator(code, null);
			expect(operatorWithoutData.length).toBe(1);
		});
	});
	describe("write", () => {
		it("should write to buffer with data", async () => {
			const operatorWithData = new operator(code, data);
			const buffer = Buffer.allocUnsafe(operatorWithData.length);
			operatorWithData.write(buffer, 0);
			expect(buffer.toString("hex")).toBe(`${codeInHex}${data.toString("hex")}`);
		});
		it("should write to buffer without data", async () => {
			const operatorWithoutData = new operator(code, null);
			const buffer = Buffer.allocUnsafe(operatorWithoutData.length);
			operatorWithoutData.write(buffer, 0);
			expect(buffer.toString("hex")).toBe(codeInHex);
		});
	});
});
