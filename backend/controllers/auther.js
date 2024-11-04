import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import generateTokenAndSetCookie from '../util/generateToken.js';
// export const signup=async (req, res)=>{
//     try{
//         const {firstName, username, password}=req.body;
//         const user=await User.findOne({username});
//         if(user){

//             return  res.status(400).json({error: "Username already exists"})
//         }
//         const salt=await bcrypt.genSalt(10);
//         const hashedPassword=await bcrypt.hash(password, salt);
//         const newUser=new User({
//             firstName,
//             username,
//             password: hashedPassword,

//         })
//         generateTokenAndSetCookie(newUser._id, res);
//         await newUser.save();
//         res.status(201).json({
//             _id: newUser._id,
//             firtName: newUser.firtName,
//             username: newUser.username
//         })

//     }
//     catch(err){
//         console.log(err);
//     }
// }


// export const login = async (req, res) => {
//     try {
//         console.log("Request body:", req.body); // Log the incoming request body

//         const { username, password } = req.body;

//         // Validate input
//         if (!username || !password) {
//             return res.status(400).json({ error: "Username and password are required." });
//         }

//         const user = await User.findOne({ username });

//         if (!user) {
//             return res.status(400).json({ error: "This user does not exist." });
//         }
//         generateTokenAndSetCookie(user._id, res);

//         // Compare the plaintext password with the hashed password
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(400).json({ error: "Incorrect password" });
//         }

//         // Successful login
//         return res.status(200).json({
//             _id: user._id,
//             username: user.username,
//         });

//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: "An internal error occurred." });
//     }
// };
export const signup = async (req, res) => {
    try {
        const { firstName, username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            username,
            password: hashedPassword,
        });
        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            firstName: newUser.firstName, // Corrected typo
            username: newUser.username,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An internal error occurred." });
    }
};

// export const login = async (req, res) => {
//     try {
//         console.log("Request body:", req.body);
//         const { username, password } = req.body;

//         // Validate input
//         if (!username || !password) {
//             return res.status(400).json({ error: "Username and password are required." });
//         }

//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ error: "This user does not exist." });
//         }

//         // Compare the plaintext password with the hashed password
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(400).json({ error: "Incorrect password" });
//         }

//         // Successful login: set cookie after verifying the password
//         generateTokenAndSetCookie(user._id, res);

//         // Respond with user data
//         return res.status(200).json({
//             _id: user._id,
//             username: user.username,
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: "An internal error occurred." });
//     }
// };


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "This user does not exist." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            username: user.username,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An internal error occurred." });
    }
};



export const users = async (req, res) => {
    try {
        const userList = await User.find(); // Use `find()` to get all users
        return res.status(200).json(userList); // Return the user list as JSON
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while fetching users." });
    }
};

  
