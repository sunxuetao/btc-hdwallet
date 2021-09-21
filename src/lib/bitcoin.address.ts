import * as crypto from "../lib/crypto";
import { bech32 } from "bech32";
import OP, { OpcodeType } from "./p2ms/op";
import bs58check = require("bs58check");

export function getP2WPKH(publicKey: Buffer): string {
	const networkPrefix = process.env.BECH32;

	const hash = crypto.hash160(publicKey);
	const words = bech32.toWords(hash);
	words.unshift(0x00);
	return bech32.encode(networkPrefix, words);
}

export function getP2PKH(publicKey: Buffer): string {
	const networkPrefix = +process.env.PUBKEY_HASH;

	const hash = crypto.hash160(publicKey);
	const payload = Buffer.allocUnsafe(21);
	payload.writeUInt8(networkPrefix, 0);
	hash.copy(payload, 1);
	return bs58check.encode(payload);
}

export function getP2SH_P2WPKH(publicKey: Buffer): string {
	const networkPrefix = +process.env.SCRIPT_HASH;
	const publicKeyHash: Buffer = crypto.hash160(publicKey);

	const ops: OP[] = [];
	const op_0 = new OP(OpcodeType.OP_0);
	ops.push(op_0);

	const publicKeyHashOP = new OP(publicKeyHash.length, publicKeyHash);
	ops.push(publicKeyHashOP);

	const bufferSize = ops.reduce((size: number, op) => {
		return size + op.length;
	}, 0);

	const publicKeyHashScript: Buffer = Buffer.allocUnsafe(bufferSize);
	let offset = 0;

	ops.forEach(op => {
		offset = op.write(publicKeyHashScript, offset);
	});
	const scriptHash: Buffer = crypto.hash160(publicKeyHashScript);
	const payload = Buffer.allocUnsafe(21);
	payload.writeUInt8(networkPrefix, 0);
	scriptHash.copy(payload, 1);
	return bs58check.encode(payload);
}
