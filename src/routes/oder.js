import express from "express";
import { createOrder ,getAllOrder,cancelOrder} from "../controllers/oder";
import { checklogin } from "../middlewares/checkPermission";

const router = express.Router();

router.post('/order/create',createOrder);
router.get('/order/getAll',getAllOrder);
router.delete('/order/cancelOrder/:id',cancelOrder);

export default router;