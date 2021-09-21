import { Injectable } from "@nestjs/common";
import KeyPath from "../lib/hdkey/key.path";
import HDKey from "../lib/hdkey/hd.key";
import publicKeyAddress from "../lib/public.key.address";
import p2msAddress from "../lib/p2ms.address";
import { logger } from "../utils/logger";
import { AddressType } from "./address.enum";

@Injectable()
export class AddressService {
	/**
	 * generate address by given seed and path
	 *
	 * @param seed
	 * @param _path
	 * @param addressType
	 * @returns address
	 */
	public async genAddress(seed: string, _path: string, addressType: string): Promise<string> {
		let address;
		try {
			const path: KeyPath = new KeyPath(_path);
			const hdkeyNode = HDKey.fromSeed(seed);
			const hdkeyChild = hdkeyNode.derivePath(path);
			const pubKeyAddress: publicKeyAddress = new publicKeyAddress(
				hdkeyChild.publicKey.toString("hex"),
			);

			switch (addressType) {
				case AddressType.P2WPKH:
					address = pubKeyAddress.getP2WPKH();
					break;
				case AddressType.P2SHP2WPKH:
					address = pubKeyAddress.getP2SH_P2WPKH();
					break;
				default:
					address = pubKeyAddress.getP2PKH();
			}
		} catch (err) {
			logger.error(`get error whiling address generation : ${err}`);
			throw err;
		}
		return address;
	}

	/**
	 * generate a p2ms address, p2sh and p2wsh
	 *
	 * @param m
	 * @param publickeys
	 * @param addressType
	 * @returns address
	 */
	public async getP2msAddress(
		m: number,
		publickeys: string[],
		addressType: string,
	): Promise<string> {
		let address;
		try {
			const p2ms = new p2msAddress(m, publickeys);
			if (addressType === AddressType.P2SH) {
				address = p2ms.P2SHAddress;
			} else {
				address = p2ms.P2WSHAddress;
			}
		} catch (err) {
			logger.error(`get error whiling generate p2ms address : ${err}`);
			throw err;
		}
		return address;
	}
}
