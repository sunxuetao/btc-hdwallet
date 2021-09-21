import * as bitcoinAddress from "./bitcoin.address";

describe("bitcoinAddress", () => {
	const address = [
		{
			pubkey: "032bbe706d55621bff557f2f711c8f587d903707703ea92974cfe534b5ddbd353f",
			P2PKH: "13hm1ym1A12PTk7w1LbZjcksPA1zf31rHF",
			P2WPKH: "bc1qrkj6y26khwtganu6m86hdcgx3h7kghndcl92ha",
			P2SH_P2WPKH: "3Crmbg6yvtczfpGHe33c3j2ArhJMQtPzmZ",
		},
		{
			pubkey: "033ec19d7360a4e2a0dfe676d24c8469a436a5f6cf5dcff25648e042da7c0429e9",
			P2PKH: "12a7pcAiZQJAkEAA3r6euxESsR4VU9gPZi",
			P2WPKH: "bc1qzyach4j3l7z0rf6alq6plut8gc6xltsl8q7200",
			P2SH_P2WPKH: "3LTocvX3SHRaqTxVXF1D4ZzwsFGEE3EnAR",
		},
		{
			pubkey: "0324a127ebb568a90e175f712dc8e09ea192996b2f95042f32d16a2a328fa5b5d8",
			P2PKH: "1KnrCxSTQR9PfHaUE3MZ6XzARPnhQoC6v3",
			P2WPKH: "bc1qec0qa0hm3n73gedfk0uvhpapfwyf4us5kfmtzp",
			P2SH_P2WPKH: "3D1yfZgyJ8T9WALr3tuJF1BiTxBFmTreQt",
		},
	];

	address.forEach(item => {
		describe("P2PKH", () => {
			it(`should return P2PKH address of ${item.pubkey}`, async () => {
				const result = bitcoinAddress.getP2PKH(Buffer.from(item.pubkey));
				expect(result).toBe(item.P2PKH);
			});
		});
		describe("P2WPKH", () => {
			it(`should return P2WPKH address of ${item.pubkey}`, async () => {
				const result = bitcoinAddress.getP2WPKH(Buffer.from(item.pubkey));
				expect(result).toBe(item.P2WPKH);
			});
		});
		describe("P2SH_P2WPKH", () => {
			it(`should return P2SH_P2WPKH address of ${item.pubkey}`, async () => {
				const result = bitcoinAddress.getP2SH_P2WPKH(Buffer.from(item.pubkey));
				expect(result).toBe(item.P2SH_P2WPKH);
			});
		});
	});
});
