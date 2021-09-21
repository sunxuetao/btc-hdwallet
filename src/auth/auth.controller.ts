import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthDto } from "./auth.dto";
import { TokenEntity } from "./token.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Api to get jwt token")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {
		this.authService = authService;
	}
	@UseGuards(AuthGuard("local"))
	@Post("/login")
	async login(@Body() user: AuthDto): Promise<TokenEntity> {
		return this.authService.login(user);
	}
}
