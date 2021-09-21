import KeyPath from "./key.path";

describe("KeyPath", () => {
	const incorrectPath = "www/999'/1'/0'/1/5";
	const correctPath = "m/84'/1'/0'/0/0";

	describe("constructor", () => {
		it("should return instance of KeyPath with correct path", async () => {
			const result = new KeyPath(correctPath);
			expect(result).not.toBeUndefined;
		});
		it("should throw error with incorrect path", async () => {
			const t = () => {
				new KeyPath(incorrectPath);
			};
			expect(t).toThrow();
		});
	});

	describe("indexes", () => {
		it("should return indexes with correct path", async () => {
			const result = new KeyPath(correctPath);
			expect(result.indexes.length).toBeGreaterThan(0);
		});
	});
});
