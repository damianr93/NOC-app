import { LogEntity, LogSeverityLevel } from "./log.entities"


describe('LogEntity', ()=> {
    
    const obj = {
        message: 'Hola mundo',
        level:LogSeverityLevel.medium,
        origin:'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {
        

        const newLog = new LogEntity(obj)

        expect(newLog).toBeInstanceOf(LogEntity)
        expect(newLog.level).toBe(obj.level)
        expect(newLog.message).toBe(obj.message)
        expect(newLog.origin).toBe(obj.origin)
        expect(newLog.createAt).toBeInstanceOf(Date)
    })

    test('should create a logEntity instance from json', () => {


        const json = `{"level":"high","message":"http://gdefefoogle.com is not ok. TypeError: fetch failed","createAt":"2024-01-06T18:30:45.013Z","origin":"check-service.ts"}`

        const fromJson = LogEntity.fromJson(json)

        expect(fromJson).toBeInstanceOf(LogEntity)
        expect(fromJson.level).toBe(LogSeverityLevel.high)
        expect(fromJson.message).toBe("http://gdefefoogle.com is not ok. TypeError: fetch failed")
        expect(fromJson.origin).toBe("check-service.ts")
        expect(fromJson.createAt).toBeInstanceOf(Date)


    })

    test('should create a logEntity instance from object', () => {



        const fromObject = LogEntity.fromObject(obj)

        expect(fromObject).toBeInstanceOf(LogEntity)
        expect(fromObject.level).toBe(LogSeverityLevel.medium)
        expect(fromObject.message).toBe(obj.message)
        expect(fromObject.origin).toBe(obj.origin)
        expect(fromObject.createAt).toBeInstanceOf(Date)


    })

})