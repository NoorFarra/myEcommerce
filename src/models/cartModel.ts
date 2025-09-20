import mongoose, {Schema, Document, ObjectId} from "mongoose";
import { iProduct } from "./productModel";


const CartStatusEnum = ["active", "completed"]

export interface ICartItem extends Document {
    product: iProduct,
    unitPrice: number,
    quantity: number
}

export interface ICart extends Document {
    userId: ObjectId | string,
    items:  ICartItem[],
    totalAmount: number,
    status: "active" | "completed"
}

const cartItemSchema = new Schema<ICartItem>({
    product: {type: Schema.Types.ObjectId, ref: "Product", requierd: true},
    quantity: {type: Number, requierd: true, default: 1},
    unitPrice: {type: Number, required: true}
})

const cartSchema = new Schema<ICart>({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    items: [cartItemSchema],
    totalAmount: {type: Number, required: true},
    status: {type: String, enum: CartStatusEnum, default: "active"}
})

export const cartModel = mongoose.model<ICart>("Cart", cartSchema)