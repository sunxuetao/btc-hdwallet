import createHmac = require("create-hmac");
import createHash = require("create-hash");

export function hmacSHA512(key: Buffer, data: Buffer): Buffer {
	return createHmac("sha512", key).update(data).digest();
}

function ripemd160(buffer: Buffer): Buffer {
	try {
		return createHash("rmd160").update(buffer).digest();
	} catch (err) {
		return createHash("ripemd160").update(buffer).digest();
	}
}

export function sha256(buffer: Buffer): Buffer {
	return createHash("sha256").update(buffer).digest();
}

export function hash160(buffer: Buffer): Buffer {
	return ripemd160(sha256(buffer));
}
