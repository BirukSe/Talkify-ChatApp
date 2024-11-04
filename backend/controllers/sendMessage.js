
import Conversation from "../models/conversation.js";
import Message from '../models/message.js';

export const sendMessage = async (req, res) => {
    try {
        console.log("Received sendMessage request");
        const { message, senderId } = req.body;
        const { id: receiverId } = req.params;
        // const senderId = req.user?._id; // Optional chaining to avoid errors

        console.log(`Sender ID: ${senderId}, Receiver ID: ${receiverId}, Message: ${message}`);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
            console.log("Created new conversation:", conversation);
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        console.log("New message created:", newMessage);

        conversation.messages.push(newMessage._id);
        await conversation.save();
        await newMessage.save();
        console.log("Message saved successfully");

        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error details in sendMessage:", err);
        return res.status(500).json({ error: "An internal error occurred." });
    }
};

// export const receiveMessage = async (req, res) => {
//     try {
//         console.log("Received receiveMessage request");
//         const { id: userToChatId } = req.params;
//         const senderId = req.body.senderId; // Change this line
//         console.log(`Sender ID: ${senderId}, User to Chat ID: ${userToChatId}`);

//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderId, userToChatId] },
//         }).populate("messages");

//         if (!conversation) {
//             console.log("No conversation found");
//             return res.status(200).json([]);
//         }

//         res.status(200).json(conversation.messages);
//     } catch (err) {
//         console.error("Error details in receiveMessage:", err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

export const receiveMessage = async (req, res) => {
    try {
        console.log("Received receiveMessage request");
        const { id: userToChatId } = req.params;
        const senderId = req.body.senderId; // Ensure senderId is being passed correctly
        console.log(`Sender ID: ${senderId}, User to Chat ID: ${userToChatId}`);

        // Query to find the conversation
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        // Log the conversation result
        console.log("Conversation found:", conversation); // Add this line

        if (!conversation) {
            console.log("No conversation found");
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);
    } catch (err) {
        console.error("Error details in receiveMessage:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

