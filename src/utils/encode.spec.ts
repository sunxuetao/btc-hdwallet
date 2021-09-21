import * as encode from "./encode";

describe("encode", () => {
	const data = Buffer.from("2b4d197570cc067f2f0ca10280f4216652e59b60", "hex");

	describe("toBase58check", () => {
		it(`should return correct toBase58check`, async () => {
			const result = encode.toBase58check(data, 0);
			expect(result).toBe("14wxRDK8dfkzowAmZMKVStyCfouTYhcBzs");
		});
	});

	describe("toBech32", () => {
		it(`should return correct toBech32`, async () => {
			const result = encode.toBech32(data, "bc");
			expect(result).toBe("bc1q9dx3jatsesr87tcv5ypgpappvefwtxmqy8lrmq");
		});
	});
});
