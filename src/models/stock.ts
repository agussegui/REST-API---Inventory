import mongoose, {Schema, Document, Types,} from "mongoose";
import IStock from "./stock"

export interface IStock extends Document {
    category: Types.ObjectId,
    products: Types.ObjectId,
    supplier: Types.ObjectId,
    proof: string,
    existenceInicial: number,
    existenceNow: number,
    priceBuy: number, 
    priceSale: number,
    Deadline: Date
}

const StockSchema: Schema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    products: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    proof: {
        type: String,
        req: true
    },
    existenceInicial: {
        type: Number,
        req: true
    },
    existenceNow: {
        type: Number,
        req: true
    },
    priceBuy: {
        type: Number,
        req: true
    },
    priceSale: {
        type: Number,
        req: true
    },
    Deadline: {
        type: Date,
        default: Date.now,
        required: true
    },

}) 

const Stock = mongoose.model<IStock>('Stock', StockSchema)  
export default Stock