import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const login=async(req,res)=>{
    console.log("Login User");
    try {
        const {username,password}=req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect= await bcrypt.compare(password,user?.password||"");
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid credentials"})
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            username:user.username,
            fullName:user.fullName,
            profilePic:user.profilePic,
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:error.message});
    }
}

export const logout=(req,res)=>{
    console.log("Logout User")
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"successfully logged out"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const signup=async(req,res)=>{
    console.log("Signup User")
    try {
        const {fullName,username,password,confirmPassword,gender}=req.body
        // console.log({fullName,username,password,confirmPassword,gender});
        if(password!=confirmPassword){
            return res.status(400).json({error: "Passwords do not match"})
        }
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error: "Username already exists"}) 
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        //pfp
        const boyPFP=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlPFP=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender==="Male"?boyPFP:girlPFP})
        //console.log(newUser);
        
        if(newUser){
            //generate JWT Token
            generateTokenAndSetCookie(newUser._id,res);
            //console.log('reached here')
            await newUser.save()
            console.log('reached here')
            res.status(201).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                pfp: newUser.profilePic
            })
            console.log('reached here')
        }
        else{
            res.status(400).json({error: "Failed to create user, ENTER CORRECT DATA MF"})
        }

    } catch (error) {
        res.status(500).json({error:error.message})
        console.error(error);
    }
}