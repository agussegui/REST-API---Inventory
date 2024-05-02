import mongoose, {Schema, Document, Types} from 'mongoose'

export interface IProducts extends Document {
    nameProduct: string
    description: string
    price: number
    amountAvailability: number
    dateCreate: Date
    category: Types.ObjectId
}

export const ProductsSchema: Schema = new Schema({
    nameProduct: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amountAvailability: {
        type: Number,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now,
        required: true
    },
    category: {
        types: Types.ObjectId,
        ref: 'Category'
    }
},{timestamps: true})

const Products = mongoose.model<IProducts>('Products', ProductsSchema)
export default Products