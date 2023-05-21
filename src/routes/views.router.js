import { Router } from "express";
//import ProductManager from "../../src/dao/fileSystem/Managers/ProductManagers.js";
import ProductsManager from "../dao/mongo/Managers/ProductsManager.js";
import CartsManager from "../dao/mongo/Managers/CartsManager.js";


const router = Router();

//const productManager = new ProductManager()
const productsServices = new ProductsManager();
const cartsServices = new CartsManager();

/* MongoDb */
router.get('/', async (req, res) => {
  const products = await productsServices.getProducts();
  res.render('products', {products});
});

router.get('/carts', async (req, res) => {
  const carts = await cartsServices.getCarts();
  res.render('carts', {carts});
  });

router.get('/chat', async (req,res) => {
  res.render('chat');
})


/* FileSystem */
/* router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', {
    name: 'la tienda de Sammy',
    css: 'home',
    products: products
  });
}); */

/* router.get('/realtimeproducts', async (req, res) => {
  res.render('realTimeProducts', {
    name: 'la tienda de Sammy',
    css: 'realTimeProducts'
  });
}); */

export default router;