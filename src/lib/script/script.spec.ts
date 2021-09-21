import { operatorCodeType } from "./operator";
import script from "./script";

describe("script", () => {
	const publicKeyHash = Buffer.from("2b4d197570cc067f2f0ca10280f4216652e59b60", "hex");

	describe("addOperator", () => {
		it("should able to add operator", async () => {
			const p2shScript: script = new script();
			expect(p2shScript["_operators"].length).toBe(0);
			p2shScript.addOperator(operatorCodeType.OP_0);
			expect(p2shScript["_operators"].length).toBe(1);
		});
	});

	describe("compile", () => {
		it("should compile ops to buffer", async () => {
			const p2shScript: script = new script();
			p2shScript.addOperator(operatorCodeType.OP_0);
			p2shScript.addOperator(publicKeyHash.length, publicKeyHash);
			const result: Buffer = p2shScript.compile();
			const expectResult = "00142b4d197570cc067f2f0ca10280f4216652e59b60";
			expect(result.toString("hex")).toBe(expectResult);
		});
	});
});
