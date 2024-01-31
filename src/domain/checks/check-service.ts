import { LogEntity, LogSeverityLevel } from "../entities/log.entities";
import { LogRepository } from "../repository/log.repository";

interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>;
};

type successCallback = (() => void | undefined);
type errorCallcack = ((error:string) => void | undefined);


export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback:successCallback,
        private readonly errorCallback:errorCallcack
    ) {};

    public async execute(url:string): Promise<boolean> {
        
        try {

            const req = await fetch(url);
            if(!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const options = {
                level:LogSeverityLevel.low, 
                message: `service ${url} is ok`, 
                origin:'check-service.ts'
            }
            
            const log = new LogEntity(options);
            
            this.logRepository.saveLog( log );
            
            this.successCallback && this.successCallback();
            
            return true;
        
        } catch (error){

            const messageError= `${url} is not ok. ${error}`;

            const options = {
                level:LogSeverityLevel.high, 
                message:messageError, 
                origin:'check-service.ts'
            }
            
            const log = new LogEntity (options);

            this.logRepository.saveLog(log);
            
            this.errorCallback && this.errorCallback(`${messageError}`);
            
            return false;
        }
        
    }

}