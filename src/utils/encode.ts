import { bech32 } from "bech32";
import bs58check = require("bs58check");

export function toBech32(data: Buffer, networkPrefix: string): string {
	const words = bech32.toWords(data);
	words.unshift(0x00);
	return bech32.encode(networkPrefix, words);
}

export function toBase58check(data: Buffer, networkPrefix: number): string {
	const payload = Buffer.allocUnsafe(21);
	payload.writeUInt8(networkPrefix, 0);
	data.copy(payload, 1);
	return bs58check.encode(payload);
}
