import fs from 'fs'

import { LogDataSources } from "../../domain/datasources/log.datasources";
import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entities';




export class FileSystemDatasource implements LogDataSources {

    private readonly logPath        = 'logs/';
    private readonly allLogsPath    = 'logs/logs-all.log';
    private readonly mediumlogPath  = 'logs/logs-medium.log';
    private readonly highLogsPath   = 'logs/logs-high.log';

    constructor() {
        this.createLogsFile()
    }

    private createLogsFile = () => {
        if( !fs.existsSync(this.logPath) ){
            fs.mkdirSync(this.logPath)
        };

        [
            this.allLogsPath,
            this.mediumlogPath,
            this.highLogsPath

        ].forEach(path => {
                
                if(fs.existsSync(path)) return 
                fs.writeFileSync(path,'')  
            }
        )
    };

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`;
        
        fs.appendFileSync(this.allLogsPath, logAsJson);

        if(newLog.level === LogSeverityLevel.low) return; 
        
        if(newLog.level === LogSeverityLevel.medium){

            fs.appendFileSync(this.mediumlogPath, logAsJson);

        } else fs.appendFileSync(this.highLogsPath, logAsJson);
    };

    private getLogsFromFile = (path:string):LogEntity[] => {

        const content = fs.readFileSync(path,'utf-8');

        if(content === '') return []

        const log = content.split('\n').map( logs => LogEntity.fromJson(logs) )

        return log


    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch (severityLevel) {

            case LogSeverityLevel.low:
            
                return this.getLogsFromFile(this.allLogsPath);
            
            case LogSeverityLevel.medium:

                return this.getLogsFromFile(this.mediumlogPath);

            case LogSeverityLevel.high:

                return this.getLogsFromFile(this.highLogsPath);
            
            default: 

                throw new Error('Severity Level is required')
        }
    };
}