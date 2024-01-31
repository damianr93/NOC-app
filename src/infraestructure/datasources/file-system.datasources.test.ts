import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasources';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entities';



describe('pruebas en FileSystemDatasource',() => {

    const logPath = path.join(__dirname, '../../../logs')

    beforeEach(()=> {
        if(fs.existsSync(logPath))
        fs.rmSync(logPath, { recursive:true, force:true })
    })
    

    test('should create log file if they do not exists', () => {

        new FileSystemDatasource()

        const wasCreated = fs.existsSync(logPath)
        const file = fs.readdirSync(logPath)

        expect(wasCreated).toBe(true)
        expect(file).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])

    })

    test('should save a log in logs-all.log', () => {

        const fileSystemDatasource = new FileSystemDatasource()
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test message low',
            origin: 'mongo-log.datasource.test.ts'
        })

        fileSystemDatasource.saveLog(log)

        const allLog = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')

        expect(allLog).toContain(JSON.stringify(log))

    })

    test('should save a log in logs-medium.log and all-logs', () => {

        const fileSystemDatasource = new FileSystemDatasource()
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test message medium',
            origin: 'mongo-log.datasource.test.ts'
        })

        fileSystemDatasource.saveLog(log)

        const mediumLog = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')
        const allLog = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')

        expect(mediumLog).toContain(JSON.stringify(log))
        expect(allLog).toContain(JSON.stringify(log))
    })

    test('should save a log in logs-high.log and all-logs', () => {

        const fileSystemDatasource = new FileSystemDatasource()
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test message high',
            origin: 'mongo-log.datasource.test.ts'
        })

        fileSystemDatasource.saveLog(log)

        const highLog = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')
        const allLog = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')

        expect(highLog).toContain(JSON.stringify(log))
        expect(allLog).toContain(JSON.stringify(log))

    })

    test('should return all logs', async() => {

        const fileSystemDatasource = new FileSystemDatasource()
        const highLog = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test message high',
            origin: 'mongo-log.datasource.test.ts'
        })

        const mediumLog = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test message medium',
            origin: 'mongo-log.datasource.test.ts'
        })

        const lowLog = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test message low',
            origin: 'mongo-log.datasource.test.ts'
        })

        await fileSystemDatasource.saveLog(highLog)
        await fileSystemDatasource.saveLog(lowLog)
        await fileSystemDatasource.saveLog(mediumLog)

        const lowLogSaved = await fileSystemDatasource.getLogs(LogSeverityLevel.low)
        const mediumLogSaved = await fileSystemDatasource.getLogs(LogSeverityLevel.medium)
        const highLogSaved = await fileSystemDatasource.getLogs(LogSeverityLevel.high)

        expect(lowLogSaved).toEqual(expect.arrayContaining([lowLog,mediumLog,highLog]))
        expect(mediumLogSaved).toEqual(expect.arrayContaining([mediumLog]))
        expect(highLogSaved).toEqual(expect.arrayContaining([highLog]))

    })

})