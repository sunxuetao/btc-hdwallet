import OP, { OpcodeType } from "./op";
import * as crypto from "../crypto";
import { bech32 } from "bech32";
import bs58check = require("bs58check");

export default class p2msAddress {
	private _sigCount: number;
	private _keyCount: number;
	private _publicKeys: string[];
	private _scriptPubKey: Buffer;

	constructor(sigCount: number, publicKeys: string[]) {
		if (publicKeys == null || publicKeys.length < 1) {
			throw new Error("public keys is empty");
		}
		if (sigCount > publicKeys.length)
			throw new Error("sigCount should be less or equal to length of public keys");
		this._sigCount = sigCount;
		this._keyCount = publicKeys.length;
		this._publicKeys = publicKeys;
	}

	get scriptPubKey(): Buffer {
		if (this._scriptPubKey == null) {
			this._scriptPubKey = this.generateScriptPubKey();
		}
		return this._scriptPubKey;
	}

	private generateScriptPubKey(): Buffer {
		const p2msOPs: OP[] = [];
		const sigCountOP = new OP(OpcodeType.OP_INT_BASE + this._sigCount);
		p2msOPs.push(sigCountOP);

		this._publicKeys.forEach(pubKey => {
			const pubKeyInBuffer = Buffer.from(pubKey, "hex");
			const keyOP = new OP(pubKeyInBuffer.length, pubKeyInBuffer);
			p2msOPs.push(keyOP);
		});

		const keyCountOP = new OP(OpcodeType.OP_INT_BASE + this._keyCount);
		p2msOPs.push(keyCountOP);

		const checkmultisigOP = new OP(OpcodeType.OP_CHECKMULTISIG);
		p2msOPs.push(checkmultisigOP);

		const bufferSize = p2msOPs.reduce((size: number, op) => {
			return size + op.length;
		}, 0);

		const buffer = Buffer.allocUnsafe(bufferSize);
		let offset = 0;

		p2msOPs.forEach(op => {
			offset = op.write(buffer, offset);
		});

		return buffer;
	}

	get hash(): Buffer {
		return crypto.hash160(this.scriptPubKey);
	}

	get P2SHAddress(): string {
		const networkPrefix = 0x05; //bitcoin.networks.bitcoin.scriptHash
		const payload = Buffer.allocUnsafe(21);
		payload.writeUInt8(networkPrefix, 0);
		this.hash.copy(payload, 1);
		return bs58check.encode(payload);
	}

	get P2WSHAddress(): string {
		const networkPrefix = "bc";
		const hash = crypto.sha256(this.scriptPubKey);
		const words = bech32.toWords(hash);
		words.unshift(0x00);
		return bech32.encode(networkPrefix, words);
	}
}
