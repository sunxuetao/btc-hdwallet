import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/user/user.entity";
export class AuthDto implements UserEntity {
	id: number;

	@ApiProperty({
		name: "username",
		required: true,
		example: "admin",
		description: "username",
	})
	username: string;

	@ApiProperty({
		name: "password",
		required: true,
		example: "admin",
		description: "password",
	})
	password: string;
}
