import Env from "./env";
import winston from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, json, align, errors, printf, colorize } = winston.format;

const errorFilter = winston.format((info, opts) => {
    return info.level === "error" ? info : false;
});

const infoFilter = winston.format((info, opts) => {
    return (info.level === "info" || info.level === "warn") ? info : false;
});

const logger = winston.createLogger({
    level: Env.LOG_LEVEL || "info",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A"
        })
    ),
    transports: [
        new winston.transports.Console({
            level: Env.LOG_LEVEL || "info",
            format: combine(
                align(),
                colorize(),
                errors({ stack: true }),
                printf((info: winston.Logform.TransformableInfo) => ` [ ${info.timestamp} ] [ ${info.level} ] : ${info.message}`)
            )
        }),
        new winston.transports.DailyRotateFile({
            level: "info",
            filename: "comedypull_%DATE%.info.log",
            dirname: Env.LOG_DIR,
            datePattern: "YYYYMMDD",
            maxFiles: "14d",
            format: combine(
                infoFilter(),
                json()
            )
        }),
        new winston.transports.DailyRotateFile({
            level: "error",
            filename: "comedypull_%DATE%.error.log",
            dirname: Env.LOG_DIR,
            datePattern: "YYYYMMDD",
            maxFiles: "14d",
            format: combine(
                errorFilter(),
                align(),
                errors({ stack: true }),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        }),
        new winston.transports.DailyRotateFile({
            level: "debug",
            filename: "comedypull_%DATE%.debug.log",
            dirname: Env.LOG_DIR,
            datePattern: "YYYYMMDD",
            maxFiles: "14d",
            format: combine(
                json()
            )
        }),
    ]
});

export default logger;
