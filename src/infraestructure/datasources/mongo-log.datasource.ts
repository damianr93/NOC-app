import { LogModel } from "../../data/mongo";
import { LogDataSources } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entities";




export class MongoLogDatasource implements LogDataSources {
   
    async saveLog(log: LogEntity): Promise<void> {

        const newLog = await LogModel.create(log);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      
        const logs = await LogModel.find({
            level:severityLevel
        });
    
        return logs.map(mongoLog => LogEntity.fromObject(mongoLog))

    }

 }