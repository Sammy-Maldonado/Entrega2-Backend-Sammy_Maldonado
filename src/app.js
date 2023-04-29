import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io';
import ProductManager from '../managers/ProductManagers.js';

const productManager = new ProductManager();


const app = express();
app.use(express.json())
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next) => {
  //Referenciando nuestro io
  req.io = io;
  next();
})

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);


const server = app.listen(8080, () => console.log('Listening on PORT 8080'));

//Server de sockets
const io = new Server(server);

//Escuchador de eventos (on)
io.on('connection', socket => {
  console.log("Nuevo cliente conectado");
});