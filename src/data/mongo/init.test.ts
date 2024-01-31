import mongoose from "mongoose"
import { MongoDatabase } from "./init"



describe('init MongoDB', () => {

    afterAll(()=> {
        mongoose.connection.close()
    })

    test('should connect to MongoDB', async() => {

        const conected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })

        expect(conected).toBe(true)
    })

    test('should throw an error', async() => {

        try {
            
            const conected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: `${process.env.MONGO_URL!}faedwfv`
            })
    
            expect(true).toBe(false)

        } catch (error) {
            
        }
    })

})