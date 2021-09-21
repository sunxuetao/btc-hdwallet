import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { AuthGuard } from "@nestjs/passport";
import { ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags("Api to get user list")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {
		this.userService = userService;
	}

	@UseGuards(AuthGuard("jwt"))
	@ApiHeader({
		name: "token",
		required: true,
		description: "request token",
	})
	@Get()
	async list(): Promise<Array<UserEntity>> {
		return this.userService.listAll();
	}
}
