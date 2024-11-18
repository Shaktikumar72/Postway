import winston from "winston";

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'requestBodylogs' }),
    ],
});

const loggerMiddleware  = async (req, res, next) => {
    winstonLogger.info(req.body);
    next();
}

export default loggerMiddleware;
