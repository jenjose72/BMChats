import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import express from 'express';

const protectRoute=async(req,res,next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({error: "Not authorized, token is required"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error: "Not authorized, token is invalid"})
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({error: "Not authorized, user not found"})
        }

        req.user = user;
        //console.log(req.user._id);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

export default protectRoute;