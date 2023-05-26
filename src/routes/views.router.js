import { Router } from "express";
//import ProductManager from "../../src/dao/fileSystem/Managers/ProductManagers.js";
import ProductsManager from "../dao/mongo/Managers/ProductsManager.js";
import CartsManager from "../dao/mongo/Managers/CartsManager.js";
import productsModel from "../dao/mongo/models/products.js";
import cartsModel from "../dao/mongo/models/carts.js";

const router = Router();

//const productManager = new ProductManager()
const productsServices = new ProductsManager();
const cartsServices = new CartsManager();

/* MongoDb */
router.get('/', async (req, res) => {
  const products = await productsServices.getProducts().lean();
  res.render('products', {products});
});

router.get('/carts', async (req, res) => {
  const carts = await cartsServices.getCarts().lean();
  res.render('carts', { carts });
});

router.get('/chat', async (req, res) => {
  res.render('chat');
})

router.get('/products', async (req, res) => {
  const { page = 1, category } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productsModel.paginate(
    { /* category: "frutas" */ },
    {
      page, limit: 5,
      lean: true,
      sort: { price: 1 }
    });
  const products = docs
  res.render('products', { products, page: rest.page, hasPrevPage, hasNextPage, prevPage, nextPage })
});

router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await productsModel.findById(productId).lean();

    if (!product) {
      res.status(404).send({ error: "Producto no encontrado. Por favor, ingrese un Id válido." });
      return;
    }

    res.render('product-details', { product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

router.get('/carts/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await cartsModel.findById(cartId).populate('products.product').lean();

    if (!cart) {
      res.status(404).send({ error: "Carrito no encontrado. Por favor, ingrese una Id válida." });
      return;
    }

    res.render('cart-details', { cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

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