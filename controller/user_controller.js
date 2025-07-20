import List from '../models/list.js';
import mongoose from 'mongoose';

const add = async (req, res) => {
    try {
        console.log("Add username request received:", req.body); 

        const { userid, username } = req.body;

        if (!userid || !username) {
            console.log("Validation failed - missing data:", { userid: !!userid, username: !!username });
            return res.status(400).json({ message: "Missing userid or username", success: false });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            console.log("Invalid userid format:", userid);
            return res.status(400).json({ message: "Invalid userid format", success: false });
        }

        console.log("Looking for existing leaderboard with userid:", userid);
        let leaderboard = await List.findOne({ userid }); 
        console.log("Existing leaderboard found:", !!leaderboard);

        if (leaderboard) {
            console.log("Adding username to existing leaderboard");
            leaderboard.usernames.push(username);
            const savedLeaderboard = await leaderboard.save();
            console.log("Username added successfully:", savedLeaderboard.usernames.length, "usernames total");

            return res.status(201).json({
                message: "Username added successfully!",
                success: true,
            });
        }

        console.log("Creating new leaderboard for userid:", userid);
        const newLeaderboard = new List({ userid, usernames: [username] });
        const savedLeaderboard = await newLeaderboard.save();
        console.log("New leaderboard created with ID:", savedLeaderboard._id);

        res.status(201).json({
            message: "List added successfully!",
            success: true,
        });
    } catch (err) {
        console.error("Add username error:", err); 
        res.status(500).json({ message: "Server error", success: false });
    }
};

const remove = async (req, res) => {
    try {
        console.log("Remove username request received:", req.body);
        
        const { username, userid } = req.body;
        
        if (!userid || !username) {
            return res.status(400).json({ message: "Missing userid or username", success: false });
        }

        console.log("Looking for leaderboard with userid:", userid);
        let leaderboard = await List.findOne({userid});
        console.log("Leaderboard found:", !!leaderboard);
        
        if (leaderboard) {
            const initialCount = leaderboard.usernames.length;
            leaderboard.usernames = leaderboard.usernames.filter(e => e !== username);
            const finalCount = leaderboard.usernames.length;
            
            console.log(`Username removal: ${initialCount} -> ${finalCount} usernames`);
            
            await leaderboard.save();
            console.log("Leaderboard updated successfully");

            return res.status(201).json({
                message: "Username deleted successfully!",
                success: true,
            });
        }

        console.log("Leaderboard not found for userid:", userid);
        return res.status(404).json({
            message: "List not found!",
            success: false,
        });
    } catch (err) {
        console.error("Remove username error:", err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

const fetchusernames = async (req, res) => {
    try {
        const userid = req.query.userid;
        console.log("=== FETCH USERNAMES ENDPOINT ===");
        console.log("Fetch usernames request for userid:", userid);
        console.log("Query params:", req.query);
        
        if (!userid) {
            console.log("Missing userid parameter");
            return res.status(400).json({
                message: "Missing userid parameter",
                data: [],
                success: false,
            });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            console.log("Invalid userid format:", userid);
            return res.status(400).json({
                message: "Invalid userid format",
                data: [],
                success: false,
            });
        }

        console.log("Searching for leaderboard with userid:", userid);
        const leaderboard = await List.findOne({userid: userid});
        console.log("Leaderboard search result:", leaderboard ? `Found with ${leaderboard.usernames.length} usernames` : 'Not found');
        
        if (!leaderboard) {
            console.log("No leaderboard found for userid:", userid);
            return res.status(200).json({
                data: [],
                success: true,
                message: "No usernames found for this user"
            });
        }
        
        console.log("Returning usernames:", leaderboard.usernames);
        return res.status(200).json({
            data: leaderboard.usernames,
            success: true,
        });
    } catch (err) {
        console.error("=== FETCH USERNAMES ERROR ===");
        console.error("Error:", err);
        res.status(500).json({
            data: [],
            success: false,
            message: "Server error"
        });
    }
};

console.log('User controller functions loaded: add, remove, fetchusernames');

export { add, remove, fetchusernames };
