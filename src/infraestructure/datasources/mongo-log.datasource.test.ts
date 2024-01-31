import mongoose from "mongoose"
import { envs } from "../../config/plugins/env.plugin"
import { MongoLogDatasource } from "./mongo-log.datasource"
import { LogModel, MongoDatabase } from "../../data/mongo"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entities"


describe('pruebas en MongoLogDatasource', () => {

    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    afterEach(async() => {
        await LogModel.deleteMany()
    })

    afterAll(async() => {
       
        mongoose.connection.close()
    })

    
    const logDatasource = new MongoLogDatasource()

    
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts'
    })


    test('should create a log',async () => {
        
        const logSpy = jest.spyOn(console, 'log')
        
        
        await logDatasource.saveLog(log)

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('mongo Log created', expect.any(String))

    })

    test('should get logs', async()=>{

        await logDatasource.saveLog(log)

        const logs = await logDatasource.getLogs(LogSeverityLevel.medium)

        expect(logs.length).toBe(1)
        expect(logs[0].level).toBe(LogSeverityLevel.medium)

    })

})