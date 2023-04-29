import { Router } from "express";
import CartManager from "../../managers/Cart.Managers.js";

const cartManager = new CartManager();
const router = Router();


router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({status: "error", error: error.message})
  }
});

router.post('/', async (req, res) => {
  try {
    const { products } = req.body;
    const newCart = await cartManager.addCart({ products })
    res.status(200).send({ sratus: "success", cart: newCart })
  } catch (error) {
    res.status(500).send({status: "error", error: error.message});
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.send({status: "success", message:`El cartito '${req.params.cid}' se ha cargado con exito`, payload: cart});
    } else {
      res.status(400).send({status: "error", error: error.message});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({status: "error", error: error.message})
  }
});

router.post('/:cid/product/:pid', async(req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);
    const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
    if (updatedCart) {
      res.status(200).send({status: "success", message: `Producto agregado correctamente al carrito '${req.params.cid}'`, payload: updatedCart})
    } else {
      res.status(400).send({status: "error", error: error.message})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({status: "error", error: error.message})
  }
})

export default router;