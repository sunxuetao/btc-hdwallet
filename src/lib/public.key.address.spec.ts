import publicKeyAddress from "./public.key.address";

describe("publicKeyAddress", () => {
	const address = [
		{
			pubkey: "032bbe706d55621bff557f2f711c8f587d903707703ea92974cfe534b5ddbd353f",
			P2PKH: "14wxRDK8dfkzowAmZMKVStyCfouTYhcBzs",
			P2WPKH: "bc1q9dx3jatsesr87tcv5ypgpappvefwtxmqy8lrmq",
			P2SH_P2WPKH: "39wmKnDGXNpFnjrsVbREHoVhUmYWUDve4V",
		},
		{
			pubkey: "033ec19d7360a4e2a0dfe676d24c8469a436a5f6cf5dcff25648e042da7c0429e9",
			P2PKH: "1ErkLPYPd4N4be5LmwdzRMLTZoFdfhZ7dT",
			P2WPKH: "bc1qnqprpc5u07mhrkqjmdp563nqn2csxe9pgkzhw7",
			P2SH_P2WPKH: "37Vy7PBUKkPTmehyZyQ2iXbCutHQaQZDFz",
		},
		{
			pubkey: "0324a127ebb568a90e175f712dc8e09ea192996b2f95042f32d16a2a328fa5b5d8",
			P2PKH: "1P9UxssHbYU4AibTjG3bsHFHUgFGj53mkc",
			P2WPKH: "bc1q7tkhqphtv5qcy90wck4hm9fk2ak068gxy68pdu",
			P2SH_P2WPKH: "3Lv1zH4Wu1nGsTBzKY9VMCiL6MACDfKYnA",
		},
	];

	address.forEach(item => {
		describe("P2PKH", () => {
			it(`should return P2PKH address of ${item.pubkey}`, async () => {
				const pubKeyAddress = new publicKeyAddress(item.pubkey);
				const result = pubKeyAddress.getP2PKH();
				expect(result).toBe(item.P2PKH);
			});
		});
		describe("P2WPKH", () => {
			it(`should return P2WPKH address of ${item.pubkey}`, async () => {
				const pubKeyAddress = new publicKeyAddress(item.pubkey);
				const result = pubKeyAddress.getP2WPKH();
				expect(result).toBe(item.P2WPKH);
			});
		});
		describe("P2SH_P2WPKH", () => {
			it(`should return P2SH_P2WPKH address of ${item.pubkey}`, async () => {
				const pubKeyAddress = new publicKeyAddress(item.pubkey);
				const result = pubKeyAddress.getP2SH_P2WPKH();
				expect(result).toBe(item.P2SH_P2WPKH);
			});
		});
	});
});
