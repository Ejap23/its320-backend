// const upload = require('../middleware/upload')
import express from "express";
import itemController from "../controllers/itemController";

const router = express.Router();

router.route("/").get(itemController.getItem);
router.route("/create").post(itemController.setItem);
router.route("/delete").delete(itemController.deleteItem);
// router.route("/filterByList").post(itemController.findByList);

const itemRoute = router;

export default itemRoute;