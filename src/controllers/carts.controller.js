import CartModel from "../dao/models/cart.model.js";
import ProductModel from "../dao/models/product.model.js";

// Crear nuevo carrito
export const createCart = async (req,res) =>{
    try{
        const cart = req.body
        const addCart = await CartModel.create(cart)

        return res.status(200).json({ message: "New cart created", addCart })
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}

// Buscar carrito por ID
export const getCartByID = async (req,res) =>{
    const { cid } = req.params;

    try{
        const cart = await CartModel.findById(cid)
        if (!cart) {
            return res.status(404).json({ error: `Cart ID ${cid} does not exist` })
        }

        res.status(200).json({ status: 'success', payload: cart })
    }catch(error){
        return res.status(404).json({ message: error.message })
    }
}

// Agregar productos al carrito
export const addProductInCart = async (req,res) =>{
    const { pid } = req.params;
    const { cid } = req.params;

    try{
        
        const product = await ProductModel.findById(pid);

        if (!product){
            return res.status(404).json({message: 'Product not found'})
        }

        const cart = await CartModel.findById(cid)

        if (!cart){
            return res.status(404).json({message: 'Cart not found'})
        }

        const productExists = cart.products.findIndex((item) => item.product.equals(pid))

            if (productExists !== -1) {
                cart.products[productExists].quantity += 1
            } else {
                const newProduct = {
                    product: pid,
                    quantity: 1,
                }
                cart.products.push(newProduct)
            }

        const result = await cart.save()
        res.status(200).json({ status: 'success', payload: result })

    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}

// Modificar cantidad de un producto (desde req.body)
export const updateProductInCart = async (req,res) =>{
    const { cid } = req.params;
    const { pid } = req.params;

    try{
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' })
        }

        const productExists = cart.products.findIndex((item) => item.product.equals(pid))
        if (productExists === -1) {
            return res.status(404).json({ error: 'Product not found' })
        }

        const quantity = req.body.quantity;
        if (!quantity || quantity < 0) {
            return res.status(400).json({ status: error, message: 'Quantity must be a positive number' })
        }

        cart.products[productExists].quantity = quantity;
        const result = await cart.save()
        res.json({ status: 'success', payload: result })

    } catch{
        return res.status(500).json({ error: error.message })
    }
}

// Eliminar un producto especifico del carrito
export const deleteProductInCart = async (req,res) =>{
    const { cid } = req.params;
    const { pid } = req.params;
    try{
        
        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' })
        }

        const productExists = cart.products.findIndex((item) => item.product.equals(pid))
        if (productExists === -1) {
            return res.status(404).json({ error: 'Invalid product' })
        }

        cart.products.splice(productExists, 1)
        const result = await cart.save()
        res.status(200).json({ status: "success", payload: result})
    }catch{
        console.log(error)
        return res.status(500).json({ error: error.message })
    }    
}

// Eliminar todos los productos del carrito
export const emptyCart = async (req,res) =>{
    const { cid } = req.params;

    try{
        const cart = await CartModel.findByIdAndUpdate(cid, { products: [] }, { new: true }).lean().exec()

        if (!cart) return res.status(404).json({ status: error, message: 'Cart not foud' })
        
        res.status(200).json({ status: "success", payload: cart })
    }catch{
        return res.status(500).json({ error: error.message })
    }
}