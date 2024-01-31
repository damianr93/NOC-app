import { LogEntity, LogSeverityLevel } from '../entities/log.entities';
import { LogDataSources } from './log.datasources';


describe('log.datasource.ts LogDatasource', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    })

    class MockLogDatasource implements LogDataSources {

        async saveLog(log: LogEntity): Promise<void> {
            return 
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test('should test the abstract class',async()=> {

        const mockLogDataSources = new MockLogDatasource()

        expect(mockLogDataSources).toBeInstanceOf(MockLogDatasource)
        expect(typeof mockLogDataSources.saveLog ).toBe('function')
        expect(typeof mockLogDataSources.getLogs).toBe('function')
    
        await mockLogDataSources.saveLog(newLog)
        const logs = await mockLogDataSources.getLogs(LogSeverityLevel.high)
        expect( logs ).toHaveLength(1)
        expect( logs[0] ).toBeInstanceOf( LogEntity )

    })

})