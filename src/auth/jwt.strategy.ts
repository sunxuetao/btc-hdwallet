import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtContants } from "./jwt.contants";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromHeader("token"),
			secretOrKey: jwtContants.secret,
		});
	}

	async validate(payload: any): Promise<UserEntity> {
		return { username: payload.username, id: payload.sub };
	}
}
