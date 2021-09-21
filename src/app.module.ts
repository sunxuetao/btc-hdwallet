import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AddressController } from "./address/address.controller";
import { AddressModule } from "./address/address.module";
import { AddressService } from "./address/address.service";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

@Module({
	imports: [AddressModule, AuthModule, UserModule],
	controllers: [AddressController, AuthController, UserController],
	providers: [AddressService, AuthService, UserService],
})
export class AppModule {}
