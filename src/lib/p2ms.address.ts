import { operatorCodeType } from "./script/operator";
import * as crypto from "./crypto/crypto";
import { toBase58check, toBech32 } from "../utils/encode";
import script from "./script/script";

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
		const p2msScript: script = new script();
		p2msScript.addOperator(operatorCodeType.OP_INT_BASE + this._sigCount);

		this._publicKeys.forEach(pubKey => {
			const pubKeyInBuffer = Buffer.from(pubKey, "hex");
			p2msScript.addOperator(pubKeyInBuffer.length, pubKeyInBuffer);
		});

		p2msScript.addOperator(operatorCodeType.OP_INT_BASE + this._keyCount);
		p2msScript.addOperator(operatorCodeType.OP_CHECKMULTISIG);

		return p2msScript.compile();
	}

	get hash(): Buffer {
		return crypto.hash160(this.scriptPubKey);
	}

	get P2SHAddress(): string {
		const networkPrefix = 0x05;
		return toBase58check(this.hash, networkPrefix);
	}

	get P2WSHAddress(): string {
		const networkPrefix = "bc";
		const hash = crypto.sha256(this.scriptPubKey);
		return toBech32(hash, networkPrefix);
	}
}
