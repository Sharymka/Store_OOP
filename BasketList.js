import { BasketItem } from "./BasketItem.js";

export class BasketList {
    API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

    constructor() {
        this.basket = [];
        this.allProducts = [];
        this.setBasketList();
    }

    setBasketList() {
        console.log('корзина создалась');
         fetch(`${this.API}/getBasket.json`)
            .then(data => data.json())
            .then(data =>{
                    this.basket = data.contents;
                    this.handleBasket();
                    this.render();
                    this.delete();
                })
    }

    handleBasket() {
        document.querySelector('.btn-basket').addEventListener('click' , (e) => {
            document.querySelector(".basket").classList.toggle("invisible");
        })
    }

    IsBasketEmpty() {
        const basketEl = document.querySelector(".basket");

        if(!basketEl.textContent.trim()) {

            basketEl.classList.add('invisible');
        }
    }

     render() {
        const basketEl = document.querySelector(".basket");
         basketEl.textContent = "";
        this.basket.forEach(basketItem => {
            const item = new BasketItem(basketItem);
            this.allProducts.push(item);
            const itemEl = item.render();
            basketEl.insertAdjacentHTML('beforeend', itemEl);
            })
    }

    addItem(btnBuy) {
        const parentEl = btnBuy.parentElement;

        const idEl = parentEl.querySelector('.card-id');
        const id_product = +idEl.dataset['id'];

        const nameEl = parentEl.querySelector('.card-title');
        const product_name = nameEl.dataset['name'];

        const priceEl = parentEl.querySelector('.card-price');
        const price = +priceEl.dataset['price'];

        let find = this.allProducts.find(product => product.id === id_product);


        if(find) {
            find.quantity ++;
            this.updateBasket(find);
        } else {
            const newItem = {id_product: id_product, product_name: product_name , price: price, quantity: 1}
            this.basket.push(newItem);
           this.render();
           this.delete();
        }

    }

    updateBasket(product) {

        const blockEl = document.querySelector(`.item-${product.id}`);

        if(blockEl) {
            blockEl.querySelector(".quantity").textContent = `Quantity: ${product.quantity}`;
            blockEl.querySelector(".totalPrice").textContent = `totalPrice: ${product.quantity * product.price}`;
        }

    }

    delete() {
        document.querySelectorAll(".delete-button").forEach(deleteBtn => {
            deleteBtn.addEventListener("click", (e) =>{

                let find = this.allProducts.find(item => item.id === +e.target.id);
                let findIndex = this.allProducts.findIndex(item => item.id === +e.target.id);

                find.quantity--;

                if(find.quantity === 0) {
                    this.allProducts.splice(findIndex, 1);
                    document.querySelector(`.item-${find.id}`).remove();
                }

                this.updateBasket(find);
                this.IsBasketEmpty();
            })
        })
    }



}