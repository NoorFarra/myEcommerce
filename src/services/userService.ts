import userModel from "../models/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface registerParams {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const register = async ({firstName, lastName, email, password}: registerParams) => {
    const findUser = await userModel.findOne({email: email})
    if (findUser) {
        return {data: "user already exists!", statusCode: 400}
    }
    
    if(password.length <= 8) {
        return {data: "Password must be more than 8 charachters", statusCode: 400}
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({email, password: hashedPassword, firstName, lastName})
    await newUser.save();

    return {data: generateJWT({firstName, lastName, email}), statusCode: 200};
}

interface loginParams {
    email: string,
    password: string
}

export const logIn = async ({email, password}: loginParams) => {

    const findUser = await userModel.findOne({email: email})

    if(!findUser) {
        return {data: "incorrect email", statusCode: 400}
    }

    const passwordMatch =await bcrypt.compare(password, findUser.password)
    if(passwordMatch) {
        return {data: findUser, statusCode: 200};
    }
    return {data: generateJWT({firstName: findUser.firstName, lastName: findUser.lastName, email}), statusCode: 400}
    
    
    
}

const generateJWT = (data: any) => {
    return jwt.sign(data, 'noorfarra', {expiresIn: '48h'})
}