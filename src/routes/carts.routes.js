import express from "express";
import { createCart, getCartByID, addProductInCart, updateProductInCart, deleteProductInCart, emptyCart } from "../controllers/carts.controller.js";

const cartRouter = express.Router();


cartRouter.post("/", createCart)


cartRouter.get("/:cid", getCartByID)


cartRouter.post("/:cid/products/:pid", addProductInCart)


cartRouter.put("/:cid/products/:pid", updateProductInCart)

// Actualizar carrito con array de productos con ?? formato  ???
cartRouter.put("/:cid", async(req, res) => {
    const { cid } = req.params;

    try{

    }
    catch{

    }
})


cartRouter.delete("/:cid/products/:pid", deleteProductInCart)

cartRouter.delete(":cid/products/:pid", emptyCart)

export default cartRouter;