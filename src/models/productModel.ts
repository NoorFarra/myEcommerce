import mongoose, {Schema, Document} from "mongoose";

export interface iProduct extends Document {
    title: string,
    image: string,
    price: number,
    stock: number
}

const productSchema = new Schema<iProduct> ({
    title: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}, 

})

const productModel= mongoose.model<iProduct>('Product', productSchema)

export default productModel;