import * as crypto from "./crypto";

describe("crypto", () => {
	const key = Buffer.from("key", "utf-8");
	const buffer = Buffer.from(
		"d13de7bd1e54422d1a3b3b699a27fb460de2849e7e66a005c647e8e4a54075cb",
		"hex",
	);

	describe("hmacSHA512", () => {
		it(`should return correct hmacSHA512`, async () => {
			const result = crypto.hmacSHA512(key, buffer);
			expect(result.toString("hex")).toBe(
				"52ccc19b8225c7ca94c4899cece04573a01d299ccfc92eec7d6734582e30538cb2479d0da9f459a36f599b83086baa27d0b0c38d92e0541cfe905ff1e58702e7",
			);
		});
	});

	describe("sha256", () => {
		it(`should return correct sha256`, async () => {
			const result = crypto.sha256(buffer);
			expect(result.toString("hex")).toBe(
				"98607c1612469f563e0bdee91ae2ce0aa85ee0ac9686b372b4a3397bc3c4b532",
			);
		});
	});

	describe("hash160", () => {
		it(`should return correct hash160`, async () => {
			const result = crypto.hash160(buffer);
			expect(result.toString("hex")).toBe("6e362203a7662394eba3daf12b191d06dc5d88ac");
		});
	});
});
