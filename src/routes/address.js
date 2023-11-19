import express from "express";
import { createAddress , updateAddress, getAddress , getOneAddress ,deleteAddress} from "../controllers/address";

const router = express.Router()

router.post('/address', createAddress)
router.put('/address/:id', updateAddress)
router.get('/address', getAddress)
router.delete('/address/:id', deleteAddress)
router.get('/address/:id', getOneAddress)

export default router