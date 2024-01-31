
export enum LogSeverityLevel {
    low   = 'low',
    medium= 'medium',
    high  = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createAt?: Date;
    origin: string;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;
    public origin: string;

    constructor(options:LogEntityOptions) {

        const {level, message, createAt = new Date(), origin} = options
        this.level   = level;
        this.message = message;
        this.createAt= createAt;
        this.origin  = origin; 
    };

    static fromJson = (json:string):LogEntity => {

        json = (json === '') ? '{}' : json;

        const {level, message, createAt, origin} = JSON.parse(json)

        const log = new LogEntity({
            level, 
            message,
            createAt : new Date(createAt),
            origin
        });
        
        return log

    };

    static fromObject = (object: { [key:string]:any}): LogEntity => {
    
        const {message, level, createAt, origin} = object
        const log = new LogEntity ({
            message, level, createAt, origin
        });

        return log;

    }

};

