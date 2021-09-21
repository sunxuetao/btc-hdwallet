import { Test, TestingModule } from "@nestjs/testing";
import { AddressService } from "./address.service";
import { instance, mock, verify } from "ts-mockito";
import { AddressType } from "./address.enum";

describe("AddressService", () => {
	let service: AddressService;
	const newService: AddressService = new AddressService();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AddressService],
		}).compile();

		service = module.get<AddressService>(AddressService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("genAddress", () => {
		const seed = "d13de7bd1e54422d1a3b3b699a27fb460de2849e7e66a005c647e8e4a54075cb";
		const path = "m/84'/1'/0'/0/0";
		let addressType: AddressType;

		it("should return an address", async () => {
			const mockedAddress: AddressService = mock(AddressService);
			const addressServ: AddressService = instance(mockedAddress);
			addressServ.genAddress(seed, path, addressType);
			verify(mockedAddress.genAddress(seed, path, addressType)).called();
		});

		it("should return an p2pkh address", async () => {
			const p2pkhAddress = "1EptuvixZwLBuT9C7pVvvNPyFmHhxK73De";
			expect(await newService.genAddress(seed, path, "P2PKH")).toBe(p2pkhAddress);
		});

		it("should return an p2wpkh address", async () => {
			const p2wpkhAddress = "bc1qj75g2yyjdcq39sa9kpvelv8k8946th3zymt8we";
			const address = await newService.genAddress(seed, path, "P2WPKH");
			expect(address).toBe(p2wpkhAddress);
		});

		it("should return an p2shp2wpkh address", async () => {
			const p2shp2wpkhAddress = "3F9KA9YyNy7gi2nnB2LbLg4WZfutPCqx1B";
			expect(await newService.genAddress(seed, path, "P2SHP2WPKH")).toBe(p2shp2wpkhAddress);
		});

		it("should return an error with incorrect path input", async () => {
			const incorrectPath = "www/999'/1'/0'/1/5";
			const t = async() => {
				await newService.genAddress(seed, incorrectPath, "P2SHP2WPKH")
			};
			expect(t).toThrow();
		});
	});

	describe("getP2msAddress", () => {
		const pubkeys = [
			"032bbe706d55621bff557f2f711c8f587d903707703ea92974cfe534b5ddbd353f",
			"033ec19d7360a4e2a0dfe676d24c8469a436a5f6cf5dcff25648e042da7c0429e9",
			"0324a127ebb568a90e175f712dc8e09ea192996b2f95042f32d16a2a328fa5b5d8",
		];
		const sigCount = 2;
		it("should return an address", async () => {
			const mockedAddress: AddressService = mock(AddressService);
			const addressServ: AddressService = instance(mockedAddress);

			addressServ.getP2msAddress(sigCount, pubkeys, "P2SH");
			verify(mockedAddress.getP2msAddress(sigCount, pubkeys, "P2SH")).called();
		});

		it("should return an p2sh address", async () => {
			const p2msAddress = "3M4t5VjYSGHQF9PwnpSt2mE1F7vKDNCwrz";
			expect(await newService.getP2msAddress(sigCount, pubkeys, "P2SH")).toBe(p2msAddress);
		});

		it("should return an p2wsh address", async () => {
			const p2wshAddress = "bc1qg8gvk9lng03y2fmpatcdd8kl43huja90ym7wshjjuffvxdkenmdss6fjr5";
			expect(await newService.getP2msAddress(sigCount, pubkeys, "P2WSH")).toBe(p2wshAddress);
		});
	});
});
