import mongoose, { Schema, Document } from 'mongoose';

// Definir la interfaz para el documento
export interface ICase extends Document {
    title: string;
    description: string;
    name: string;
    lastname: string;
    genre: string;
    age: number;
    lat: number;
    lng: number;
    creationDate: Date;
    isEmailSent: boolean;
}
// Definir el esquema usando mongoose
const caseSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now, 
    },
    isEmailSent: {
        type: Boolean,
        default: false
    }
});

// Exportar el modelo
export const CaseModel = mongoose.model<ICase>('Case', caseSchema);