import KeyPath from "./key.path";
import HDKey from "./hd.key";

describe("HDKey", () => {
	const correctPath = "m/84'/1'/0'/0/0";
	const incorrectSeed = "";
	const correctSeed = "d13de7bd1e54422d1a3b3b699a27fb460de2849e7e66a005c647e8e4a54075cb";
	const expectPrivateKey = "3c8fb977928773422181038da73b64aa7f6c51fa7bc0e2e11d081cc1d704dcb2";

	describe("fromSeed", () => {
		it("should return instance of HDKey with correct seed", async () => {
			const result = HDKey.fromSeed(correctSeed);
			expect(result).not.toBeUndefined();
		});
		it("should throw error with incorrect path", async () => {
			const t = () => {
				HDKey.fromSeed(incorrectSeed);
			};
			expect(t).toThrow();
		});
	});

	describe("derivePath", () => {
		it("should return child HDKey Node with correct path", async () => {
			const keyPath: KeyPath = new KeyPath(correctPath);
			const hdKey = HDKey.fromSeed(correctSeed);
			const result = hdKey.derivePath(keyPath);
			expect(result).not.toBeUndefined();
			expect(result.privateKey.toString("hex")).toBe(expectPrivateKey);
		});
		it("should throw error with correct path", async () => {
			const t = () => {
				const keyPath = null;
				const hdKey = HDKey.fromSeed(correctSeed);
				hdKey.derivePath(keyPath);
			};
			expect(t).toThrow();
		});
	});
});
