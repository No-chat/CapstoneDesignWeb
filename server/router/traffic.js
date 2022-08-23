import express from 'express'

import deleteCheck from "../middleware/deleteCheck.js";
import { getAllData, getFilteredData, deleteDataById } from '../traffic/trafficrepository.js';

const router = express.Router()

router.get('/', getAllData)
router.get('/filteredData', getFilteredData)
router.delete('/_ids', deleteCheck, deleteDataById)

export default router;