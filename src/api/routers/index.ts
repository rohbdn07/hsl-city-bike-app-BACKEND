import { Router } from 'express'

import journeyList from './journey'


const router = Router()

router.use(journeyList)

export default router