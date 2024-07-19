import User from '../models/user.model.js';

export const getUsersForSidebar= async (req,res)=>{
    try {
        const loggedInUserId= req.user._id;

        const filteredUsers= await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Failed to get users for sidebar"})
    }
}