import p2msAddress from "./p2ms.address";

describe("p2msAddress", () => {
	const sigCount = 2;
	const pubkeys = [
		"032bbe706d55621bff557f2f711c8f587d903707703ea92974cfe534b5ddbd353f",
		"033ec19d7360a4e2a0dfe676d24c8469a436a5f6cf5dcff25648e042da7c0429e9",
		"0324a127ebb568a90e175f712dc8e09ea192996b2f95042f32d16a2a328fa5b5d8",
	];
	const p2ms = new p2msAddress(sigCount, pubkeys);

	describe("constructor", () => {
		it("should return instance of p2msAddress with correct parameters", async () => {
			const result = new p2msAddress(sigCount, pubkeys);
			expect(result).not.toBeUndefined;
		});
		it("should throw error with incorrect sigCount", async () => {
			const t = () => {
				new p2msAddress(pubkeys.length + 1, pubkeys);
			};
			expect(t).toThrow();
		});
		it("should throw error with incorrect public keys", async () => {
			const t = () => {
				new p2msAddress(pubkeys.length + 1, null);
			};
			expect(t).toThrow();
		});
	});

	describe("P2SHAddress", () => {
		it("should return P2SH address", async () => {
			const result = p2ms.P2SHAddress;
			expect(result).toBe("3M4t5VjYSGHQF9PwnpSt2mE1F7vKDNCwrz");
		});
	});

	describe("P2WSHAddress", () => {
		it("should return P2WSH address", async () => {
			const result = p2ms.P2WSHAddress;
			expect(result).toBe("bc1qg8gvk9lng03y2fmpatcdd8kl43huja90ym7wshjjuffvxdkenmdss6fjr5");
		});
	});
});
