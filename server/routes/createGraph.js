import { Router } from "express"

import { createGraph } from "../controllers/createGraph.js"

const router = Router();

// Create routes (declarations)
router.post('/', createGraph)

export default router