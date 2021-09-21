import winston = require("winston");
import appRoot = require("app-root-path");

export const logger = winston.createLogger({
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	transports: [
		new winston.transports.File({
			filename: `${appRoot}/logs/app.log`,
			level: "info",
		}),
		new winston.transports.Console({
			level: "debug",
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
			),
		}),
	],
	exitOnError: false, // do not exit on handled exceptions
});
