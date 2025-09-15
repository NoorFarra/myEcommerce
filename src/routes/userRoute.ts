import express from "express"
import { register, logIn }from "../services/userService"

const router = express.Router();

router.post('/register', async (req, res) => {
 
    const {firstName, lastName, email, password} = req.body

  const result = await register({firstName, lastName, email, password})
    res.status(result.statusCode).send(result.data)

})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    const result = await logIn({email, password})
    res.status(result.statusCode).send(result.data)
})

export default router