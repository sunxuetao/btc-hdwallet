import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import dotenv = require("dotenv");
import { logger } from "./utils/logger";

async function bootstrap() {
	dotenv.config();
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const options = new DocumentBuilder()
		.setTitle("bitcoin HD wallet")
		.setDescription("Generate HD SegWit bitcoin address and generate a p2ms-p2sh bitcoin address.")
		.setVersion("1.0.0")
		.addTag("Address APIs.")
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("/docs", app, document);
	await app.listen(process.env.PORT);
	logger.info(
		`server is listening on port ${process.env.PORT} (http://localhost:${process.env.PORT})`,
	);
	logger.info(`Swagger-ui is available on http://localhost:${process.env.PORT}/docs`);
}
bootstrap();
