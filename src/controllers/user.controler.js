import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import { v4 as uuidv4 } from 'uuid';
const SECRET_CODE = 'iambatman' //supposed to go in env -> currently present here

const saltRounds = 10;

function signup(req, res){
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({status: false, message: 'could not register user', error: 'required fiedls not presetn'})
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    const userId = uuidv4();
    User.createUser(email, hash, name, userId);
    return res.status(201).json({status: true, message: 'user signed up succesfully'})
}

async function signin(req, res){
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({status: false, message: 'could not signin user', error: 'required fiedls not presetn'})
    }
    const user = User.getUserByEmail(email);
    if(!user){
        return res.status(400).json({status: false, message: 'either password or email is incorrect', error: 'either password or email is incorrect'})
    }
    const isValidated = await bcrypt.compare(password, user.password);
    console.log(isValidated);
    if(!isValidated){
        return res.status(400).json({status: false, message: 'either password or email is incorrect', error: 'either password or email is incorrect'})
    }
    console.log(user.id);
    //do jwt token signing
    const token = await jwt.sign({id: user.id, email: user.email}, SECRET_CODE);
    
    //adding the token to the http only cookie
    const cookieOptions = {
        httpOnly: true
    }
    // if(process.env.NODE_ENV === 'PRODUCTION') cookieOptions.secure = true
    res.cookie('jwt', token)

    const userCopy = {...user, token}
    return res.status(200).json({status: true, data: 'login success', user: userCopy});
}

function allUsers(req, res){
    return res.status(200).json({data: User.getUsers()});
}
export {signup, signin, allUsers}