import { Router } from "express";
import ProductManager from "../../managers/ProductManagers.js";

const productManager = new ProductManager()
const router = Router();

router.get('/', async (req, res) => {
const products = await productManager.getProducts();
  res.render('home', {
    name: 'la tienda de Sammy',
    css: 'home',
    products: products
  });
});

router.get('/realtimeproducts', async (req,res) => {
  res.render('realTimeProducts', {
    name: 'la tienda de Sammy',
    css: 'realTimeProducts'
  })
})

export default router;