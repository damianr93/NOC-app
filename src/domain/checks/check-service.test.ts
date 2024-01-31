import { LogEntity } from "../entities/log.entities";
import { CheckService } from "./check-service"


describe('', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const succsessCallback = jest.fn();
    const errorCallback = jest.fn()

    const checkservice = new CheckService(
        mockRepository,
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
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('should call errorCallback when fetch returns false', async() =>{

        const wasOk = await checkservice.execute('http://www.goosdfsefesgle.com')

        expect(wasOk).toBe(false)
        expect(succsessCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

})