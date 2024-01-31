import { LogEntity } from "../entities/log.entities";
import { CheckServiceMultiple } from "./check-service-multiple";


describe('', () => {

    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const succsessCallback = jest.fn();
    const errorCallback = jest.fn()

    const checkservice = new CheckServiceMultiple(
        [mockRepo1,mockRepo2,mockRepo3],
        succsessCallback,
        errorCallback
        
    )

    beforeEach(()=> {
        jest.clearAllMocks()
    })

    test('should call successCallback when fetch returns true', async() =>{

        const wasOk = await checkservice.execute('http://www.google.com')

        expect(wasOk).toBe(true)
        expect(succsessCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })

    test('should call errorCallback when fetch returns false', async() =>{

        const wasOk = await checkservice.execute('http://www.goosdfsefesgle.com')

        expect(wasOk).toBe(false)
        expect(succsessCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })

})
