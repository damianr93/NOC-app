import { envs } from "../config/plugins/env.plugin"
import { CheckService } from "../domain/checks/check-service"
import { CheckServiceMultiple } from "../domain/checks/check-service-multiple"
import { LogSeverityLevel } from "../domain/entities/log.entities"
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasources"
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource"
import { PostgresLogDatasource } from "../infraestructure/datasources/postgre-log.datasource"
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repositories-impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"



const fslogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)
const mongologRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
)
const postgrelogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)


export class Server {

    public static async start() {

        console.log('Server started...')

        //*Notificar por email:
        const emailService = new EmailService()
        emailService.sendEmailWithFileSystemLogs('example@gmail.com')
        emailService.sendEmail({
            to: 'example@gmail.com',
            subject: 'Plin plin plin',
            htmlBody: `
            <h1>TITULO DEL MENSAJE:</h1>
             <P>Mensaje aqui</p>
            `
        })

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'URL A MONITOREAR'
                new CheckServiceMultiple(
                    [   
                        fslogRepository,
                        mongologRepository,
                        postgrelogRepository
                    ],
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url)
            }
        )

    }

}