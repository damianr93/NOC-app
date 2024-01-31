import { envs } from "./env.plugin"



describe('env.plugin.ts', () => {


    test('should return env options', () => {
          
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'damianrodriguezlarioja@gmail.com',
            MAILER_SECRET_KEY: 'lgiskypfqbiyesup',
            PROD: false,
            MONGO_URL: 'mongodb://Chaya:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'Chaya',
            MONGO_PASS: '123456789'
        })

    })

    test('should return error if not foung env', async() => {

        jest.resetModules()
        process.env.PORT = 'ABC'

        try {
            await import('./env.plugin')
            expect(true).toBe(false)
            
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }

    })

})