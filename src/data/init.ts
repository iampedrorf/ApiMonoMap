// Este archivo se encarga de conectarse a la base de datos
import mongoose from "mongoose";
interface ConnectionOptions{
    mongoUrl: string;
    dbName: string
}

export class MongoDatabase{
    static async connect(options:ConnectionOptions){
        try{
            await mongoose.connect(options.mongoUrl,{
                dbName:options.dbName
            });
            console.log("Coneccion a la base de datos exitosa");
        }
        catch(error){
            console.error(error);
            console.error("Ocurrio un error al conectarse a la base de datos");
        }
    }
}