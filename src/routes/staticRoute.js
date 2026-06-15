import {Router} from "express";
import { buildHome,buildAbout } from "../controllers/baseController.js";

// Create a new router instance
const router = Router()


// Home and about
router.get("/", buildHome);
router.get("/about", buildAbout);

export default router;