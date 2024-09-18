import { Request, Response } from "express"
import { CaseModel } from "../../../data/models/case.model";


export class CaseController {

    public getCases = async (req: Request, res: Response) => {
        try {
            const cases = await CaseModel.find();
            return res.json(cases);
        } catch (error) {
            return res.json([])
        }
    }


    public createCase = async (req: Request, res: Response) => {
        try {
            const { title, description, name, lastname, genre, age, lat, lng } = req.body;
            const newCase = await CaseModel.create({
                title,
                description,
                name,
                lastname,
                genre,
                age,
                lat,
                lng,
            })
            res.json(newCase);
        } catch (error) {
            res.json({ message: "Ocurrio un error mientras de creba el caso" })
        }
    }

    public getCaseById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const caseId = await CaseModel.findById(id);
            return res.json(caseId);
        } catch (error) {
            return res.json({ message: "Ocurrió un error al obtener el caso. El ID no se encuentra." })
        }
    }

    public updateCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { title, description, name, lastname, genre, age, lat, lng, } = req.body;
            await CaseModel.findByIdAndUpdate(id, {
                title,
                description,
                name,
                lastname,
                genre,
                age,
                lat,
                lng,
            })

            const updateCase = await CaseModel.findById(id);
            return res.json(updateCase);

        } catch (error) {
            return res.json({ message: "Ocurrio un error al actualizar el caso" })
        }
    }

    public deteleCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deleteCase = CaseModel.findByIdAndDelete(id);
            return res.json(deleteCase)
        } catch (error) {
            return res.json({ message: "AOcurrio un error al eliminar el caso" })
        }
    }

    public getCasesFromLastWeek = async (req: Request, res: Response) => {
        try {
            const today = new Date();
            
            const lastWeekStart = new Date();
            lastWeekStart.setDate(today.getDate() - 7);
            
            const startOfLastWeek = new Date(lastWeekStart.setHours(0, 0, 0, 0)); 
            const endOfLastWeek = new Date(today.setHours(23, 59, 59, 999)); 

            const cases = await CaseModel.find({
                creationDate: {
                    $gte: startOfLastWeek,
                    $lte: endOfLastWeek
                }
            });

            return res.json(cases);
        } catch (error) {
            return res.status(500).json({ message: "Ocurrió un error al obtener los casos de la última semana." });
        }
    }

   
}

