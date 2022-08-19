import express from 'express'

import deleteCheck from "../middleware/deleteCheck.js";
import * as traffic from '../traffic/trafficrepository.js'

const router = express.Router()

router.get('/',traffic.getAllData)
router.get('/speed',traffic.getFilteredDataBySpeed)
router.get('/date', traffic.getFilteredDataByDate)
router.delete('/_ids', deleteCheck, traffic.deleteDataById)

export default router;