import express from 'express'
import getRoot from '../controllers/root/getRoot'
import postRoot from '../controllers/root/postRoot'

const root = express.Router()
// GET
root.get('/', getRoot)

// POST
root.post('/', postRoot)

export default root