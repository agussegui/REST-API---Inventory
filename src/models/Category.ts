import mongoose, {Schema, Document, PopulatedDoc,Types} from 'mongoose'
import { IProducts } from './Products'

export interface ICategory extends Document  {
    nameCategory: string
    products: PopulatedDoc<IProducts & Document>[]
}

export const CategorySchema: Schema = new Schema({
    nameCategory: {
        type: String,
        required: true
    },
    products: [
        {
            type:Types.ObjectId,
            ref: 'Products'
        }
    ]
    
},{timestamps: true})

const Category = mongoose.model<ICategory>('Category', CategorySchema)
export default Category