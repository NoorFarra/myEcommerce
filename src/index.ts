import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute"
import { seedIntProduct } from "./services/productService";


const app = express();
const port = 3001;
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => console.log("mongo connected"))
.catch((err) => console.log("failed to connect", err))

seedIntProduct();
app.use('/user', userRoute)
app.use('/product', productRoute)


app.listen(port, ()=> {
    console.log("server is running at port 3001")

})