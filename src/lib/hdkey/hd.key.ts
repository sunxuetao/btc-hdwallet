import * as crypto from "../crypto";
import ecc = require("tiny-secp256k1");
import KeyPath from "./key.path";

export default class HDKey {
	private _privateKey: Buffer | undefined;
	private _publicKey: Buffer;
	private _chainCode: Buffer;

	get privateKey(): Buffer {
		return this._privateKey;
	}

	get publicKey(): Buffer {
		return this._publicKey;
	}

	public static fromSeed = (seedHex: string): HDKey => {
		const seed: Buffer = Buffer.from(seedHex, "hex");

		if (seed.length < 16) throw new Error("Seed should be at least 128 bits");
		if (seed.length > 64) throw new Error("Seed should be at most 512 bits");

		const hashMAC = crypto.hmacSHA512(Buffer.from("Bitcoin seed", "utf8"), seed);
		const privateKey = hashMAC.slice(0, 32);
		const chainCode = hashMAC.slice(32);
		const publicKey = ecc.pointFromScalar(privateKey, true);

		return new HDKey(publicKey, chainCode, privateKey);
	};

	private constructor(
		publicKey: Buffer,
		chainCode: Buffer,
		privateKey: Buffer | undefined = undefined,
	) {
		if (privateKey && !ecc.isPrivate(privateKey)) throw new TypeError("Private key is Invalid");

		this._publicKey = publicKey;
		this._privateKey = privateKey;
		this._chainCode = chainCode;
	}

	private derive(index: number): HDKey {
		const isHardened = index >= 0x80000000;
		const data = Buffer.allocUnsafe(37);

		// Hardened child
		if (isHardened) {
			if (!this._privateKey) throw new Error("Missing private key for hardened child key");

			// data = 0x00 || ser256(kpar) || ser32(index)
			data[0] = 0x00;
			this._privateKey!.copy(data, 1);
			data.writeUInt32BE(index, 33);

			// Normal child
		} else {
			// data = serP(point(kpar)) || ser32(index)
			//      = serP(Kpar) || ser32(index)
			this._publicKey.copy(data, 0);
			data.writeUInt32BE(index, 33);
		}

		const hashMAC = crypto.hmacSHA512(this._chainCode, data);
		const hashMACLeft = hashMAC.slice(0, 32);
		const hashMACRight = hashMAC.slice(32);

		let childPrivateKey: Buffer | undefined;
		let childPublicKey: Buffer;

		//  parent private key -> child private key
		if (this._privateKey) {
			childPrivateKey = ecc.privateAdd(this._privateKey, hashMACLeft);

			if (childPrivateKey == null) return this.derive(index + 1);

			childPublicKey = ecc.pointFromScalar(childPrivateKey, true);

			//  parent public key -> child public key
		} else {
			childPublicKey = ecc.pointAddScalar(this._publicKey, hashMACLeft, true);

			if (childPublicKey === null) return this.derive(index + 1);
		}

		return new HDKey(childPublicKey, hashMACRight, childPrivateKey);
	}

	public derivePath(path: KeyPath): HDKey {
		if (path == null) throw new Error("path can't be null");
		return path.indexes.reduce((current, index) => current.derive(index), this);
	}
}
