import * as crypto from "./crypto/crypto";
import { operatorCodeType } from "./script/operator";
import { toBase58check, toBech32 } from "../utils/encode";
import script from "./script/script";

export default class publicKeyAddress {
	private _publicKey: Buffer;

	constructor(publicKey: string) {
		this._publicKey = Buffer.from(publicKey, "hex");
	}

	getP2WPKH(): string {
		const networkPrefix = process.env.BECH32;
		const publicKeyHash = crypto.hash160(this._publicKey);
		return toBech32(publicKeyHash, networkPrefix);
	}

	getP2PKH(): string {
		const networkPrefix = +process.env.PUBKEY_HASH;
		const publicKeyHash: Buffer = crypto.hash160(this._publicKey);
		return toBase58check(publicKeyHash, networkPrefix);
	}

	getP2SH_P2WPKH(): string {
		const networkPrefix = +process.env.SCRIPT_HASH;
		const publicKeyHash: Buffer = crypto.hash160(this._publicKey);

		const p2shScript: script = new script();
		p2shScript.addOperator(operatorCodeType.OP_0);
		p2shScript.addOperator(publicKeyHash.length, publicKeyHash);
		const publicKeyHashScript: Buffer = p2shScript.compile();

		const scriptHash: Buffer = crypto.hash160(publicKeyHashScript);
		return toBase58check(scriptHash, networkPrefix);
	}
}
