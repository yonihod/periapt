import express from 'express'
import getRoot from '../controllers/root/getRoot'

const root = express.Router()
// GET
root.get('/', getRoot)

export default root