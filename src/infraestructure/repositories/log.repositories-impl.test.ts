import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entities"
import { LogRepositoryImpl } from "./log.repositories-impl"



describe('logRepositoryImplementation', () => {

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const logRepository = new LogRepositoryImpl(mockLogDataSource)

    const log = new LogEntity({
        message: 'test logRepoimpl',
        level: LogSeverityLevel.low,
        origin: 'log.repositories-impl.test.ts'
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('saveLog should call the datasource with arguments', async()=> {

        await logRepository.saveLog(log)

        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log)

    })

    test('getLogs should call the datasource with arguments', async()=> {

        const log = await logRepository.getLogs(LogSeverityLevel.low)

        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)

    })  

})