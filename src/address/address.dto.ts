import { ApiProperty } from "@nestjs/swagger";

export class P2msDto {
	@ApiProperty({
		name: "m",
		required: true,
		example: 2,
		description: "m number of sign",
	})
	m: number;

	@ApiProperty({
		name: "publicKeys",
		required: true,
		example: [
			"032bbe706d55621bff557f2f711c8f587d903707703ea92974cfe534b5ddbd353f",
			"033ec19d7360a4e2a0dfe676d24c8469a436a5f6cf5dcff25648e042da7c0429e9",
			"0324a127ebb568a90e175f712dc8e09ea192996b2f95042f32d16a2a328fa5b5d8",
		],
		description: "public keys",
	})
	publicKeys: string[];

	@ApiProperty({
		name: "addressType",
		required: true,
		enum: ["P2SH", "P2WSH"],
		example: "P2SH",
		description: "address type: P2SH, P2WSH",
	})
	addressType: string;
}

export class AddressDto {
	@ApiProperty({
		name: "seed",
		required: true,
		description: "bitcoin seed",
		example:
			"a5c64429d0437f1a51a1c9b5423b25b16a045cd3909e37b7210a88ac08eb2b789138af170a23267df0fdeb1e064b9efebb3e02847b821f4b1752d7e814b27e7f",
	})
	seed: string;

	@ApiProperty({
		name: "path",
		example: "m/84'/1'/0'/1/5",
		required: true,
		description: "bip32 path",
	})
	path: string;

	@ApiProperty({
		name: "addressType",
		required: true,
		enum: ["P2PKH", "P2WPKH", "P2SHP2WPKH"],
		example: "P2PKH",
		description: "address type",
	})
	addressType: string;
}
