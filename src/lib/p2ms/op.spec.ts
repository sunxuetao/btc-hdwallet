import OP, { OpcodeType } from "./op";

describe("OP", () => {
	const code = OpcodeType.OP_CHECKMULTISIG;
	const codeInHex = "ae";
	const data = Buffer.from(
		"032bbe706d55621bff557f2f711c8f587d903707703ea92974cfe534b5ddbd353f",
		"hex",
	);

	describe("length", () => {
		it("should return correct length with data", async () => {
			const opWithData = new OP(code, data);
			expect(opWithData.length).toBe(data.length + 1);
		});
		it("should return correct length without data", async () => {
			const opWithoutData = new OP(code, null);
			expect(opWithoutData.length).toBe(1);
		});
	});
	describe("write", () => {
		it("should write to buffer with data", async () => {
			const opWithData = new OP(code, data);
			const buffer = Buffer.allocUnsafe(opWithData.length);
			opWithData.write(buffer, 0);
			expect(buffer.toString("hex")).toBe(`${codeInHex}${data.toString("hex")}`);
		});
		it("should write to buffer without data", async () => {
			const opWithoutData = new OP(code, null);
			const buffer = Buffer.allocUnsafe(opWithoutData.length);
			opWithoutData.write(buffer, 0);
			expect(buffer.toString("hex")).toBe(codeInHex);
		});
	});
});
