import { Controller, Inject, Get, Query, Post, Body, UseGuards, UseFilters } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiQuery, ApiHeader } from "@nestjs/swagger";
import { AddressGenerateResponse } from "./address.interface";
import { logger } from "../utils/logger";
import { AddressService } from "./address.service";
import { P2msDto, AddressDto } from "./address.dto";
import { AddressExceptionsFilter } from "../utils/exception.filter";

@ApiTags("Api to generate HD SegWit address, and p2ms address")
@Controller("/address")
export class AddressController {
	constructor(@Inject(AddressService) private readonly addressService: AddressService) {}

	@UseGuards(AuthGuard("jwt"))
	@Get("/address")
	@ApiQuery({
		type: AddressDto,
	})
	@ApiHeader({
		name: "token",
		required: true,
		description: "request token",
	})
	@UseFilters(AddressExceptionsFilter)
	public async getAddress(
		@Query("seed") seed,
		@Query("path") path,
		@Query("addressType") addressType,
	): Promise<AddressGenerateResponse> {
		logger.info(`seed: ${seed}, path: ${path}, addressType: ${addressType}`);
		const data = await this.addressService.genAddress(seed, path, addressType);
		logger.info(`address: ${data}`);
		// no error then return 200, otherwise the exception will be catched by AddressExceptionsFilter
		// response status code will be set in terms of it is a http or internal exception
		return { code: 200, message: "get an address successfully.", data };
	}

	@UseGuards(AuthGuard("jwt"))
	@ApiHeader({
		name: "token",
		required: true,
		description: "request token",
	})
	@Post("/p2sh")
	@UseFilters(AddressExceptionsFilter)
	public async getP2msAddress(@Body() p2msDto: P2msDto): Promise<AddressGenerateResponse> {
		logger.info(`p2ms dto: ${JSON.stringify(p2msDto)}`);
		const data = await this.addressService.getP2msAddress(
			p2msDto.m,
			p2msDto.publicKeys,
			p2msDto.addressType,
		);
		logger.info(`address: ${data}`);
		return { code: 200, message: "get an address successfully.", data };
	}
}
