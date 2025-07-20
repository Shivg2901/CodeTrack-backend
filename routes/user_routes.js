import express from 'express';
import { add, remove, fetchusernames } from '../controller/user_controller.js';

const router = express.Router();

console.log('User routes being registered...');

router.post("/add", add);
router.post("/remove", remove);
router.get("/fetchusernames", fetchusernames);

// Add a test route to verify the router is working
router.get("/test", (req, res) => {
    res.json({ message: "User routes are working", success: true });
});

export default router;
