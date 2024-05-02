import mongoose, {Schema, Document} from 'mongoose'

export interface ISupplier extends Document  {
    nameCategory: string
    email: string
    address: string
    numberPhone: string
}

const SupplierSchema: Schema = new Schema({
    nameSupplier: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    numberPhone: {
        type: Number,
        required: true
    }
})

const Suppliers = mongoose.model<ISupplier>('Supplier', SupplierSchema)
export default Suppliers