
import { ProductsList } from './ProductsList/ProducstList.js';
import { BasketList } from './Basket/BasketList.js';


const basketList = new BasketList();
const productsList = new ProductsList(basketList);





