import cron from 'node-cron'
import { CaseModel } from "../../data/models/case.model";
import { EmailService } from "../services/email.services"
import { generateCaseEmailTemplate } from "../templates/email.templates";

export const emailJob = ()=>{
    const emailService = new EmailService();
    console.log("Ejecución cada 10 segundos")
    cron.schedule("*/10 * * * * *", async ()=>{
        try {
            const cases = await CaseModel.find({isEmailSent:false})
            if(!cases.length){
                console.log("Por el momento no hay casos registrados")
                return;
            }
            console.log(`Procesando ${cases.length} casos`)
            await Promise.all(
                cases.map(async (casee) => {
                    try {
                        const htmlBody = generateCaseEmailTemplate(
                            casee.title,
                            casee.description,
                            casee.name,
                            casee.lastname,
                            casee.genre,
                            casee.age,
                            casee.lat,
                            casee.lng
                        )
                        await emailService.sendEmail({
                            to: "pedro.r.flores13@gmail.com",
                            subject: `Nuevo Caso Registrado: ${casee.title} ${casee.description}`,
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el caso con id: ${casee._id}`);
                        
                        let updateCase = {
                            title: casee.title,
                            description: casee.description,
                            name: casee.name,
                            lastname: casee.lastname,
                            genre: casee.genre,
                            age: casee.age,
                            lat: casee.lat,
                            lng: casee.lng,
                            isEmailSent:true
                        }
                        await CaseModel.findByIdAndUpdate(casee._id, updateCase);
                        console.log(`Caso actualizado para el Id: ${casee._id}`);

                    } catch (error) {
                        console.log("Error al procesar el caso");
                    }
                })
            )
        } catch (error) {
            console.error("Ocurrio un error durante el proceso :((");
        }
    })
}