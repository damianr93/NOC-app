
import { LogEntity } from "../../entities/log.entities"
import { SendEmailLogs } from "./send-email-logs"



describe('sendEmailLogs', ()=> {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    
    const sendEmail = new SendEmailLogs(
            mockEmailService as any,
            mockRepository
        
    )
    beforeEach(()=> {
        jest.clearAllMocks()
    })

    
    test('should call sendEmail and saveLog', async() => {
        

        const wasOk = await sendEmail.execute('damianrodriguezlarioja@gmail.com')
 
        expect(wasOk).toBe(true)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect( mockRepository.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity))
        expect( mockRepository.saveLog ).toHaveBeenCalledWith({
            createAt: expect.any(Date), 
            level: "low", 
            message: "Log Email sent", 
            origin: "send-email-logs.ts"
        })
        
    })

    test('should log in case of error', async() => {

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false)
        
        const wasOk = await sendEmail.execute('damianrodriguezlarioja@gmail.com')
 
        expect(wasOk).toBe(false)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect( mockRepository.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity))
        expect( mockRepository.saveLog ).toHaveBeenCalledWith({
            createAt: expect.any(Date), 
            level: "high", 
            message: "Error: Email log not sent", 
            origin: "send-email-logs.ts"
        })
        
    })

})