import { LogDataSources } from '../../domain/datasources/log.datasources';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entities';
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDataSources:LogDataSources,
    ){}


    async saveLog(newLog: LogEntity): Promise<void> {

        this.logDataSources.saveLog( newLog )
        
    };

    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        return this.logDataSources.getLogs(severityLevel)

    };

}