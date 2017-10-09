import * as express from 'express'
import { getCounter } from './../services/counter'
const router = express.Router()

router.use('/v1/api/counter', (req, res) => res.send({counter: getCounter()}))

export default router
