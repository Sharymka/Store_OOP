
import { Product } from './Product.js';

export class ProductsList {
     API =
        "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

    constructor ( basketList) {
       this.goods = [];
       this.filtered = [];
       this.totalPrice = 0;
       this.basketList = basketList;
       this.main();

    }
    async  main() {
        await this._getProducts();
        await this.getImages();
    }

    _getProducts () {
       return fetch(`${this.API}/catalogData.json`)
            .then(text => text.json())
           .then (data => {
               this.goods = data;
               this.render();
               this.addHandle();
           } )
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        const productListEl = document.querySelector('.products');
        productListEl.innerHTML = "";

            for(let product of this.goods) {
                const item = new Product(product);
                this.getTotalPrice(item.price);
                productListEl.insertAdjacentHTML('beforeend', item.render());
            }



    }

    getTotalPrice(itemPrice) {
        this.totalPrice += itemPrice;
    }

    getImages() {

        let imageElements =[...document.querySelectorAll('img')];

        imageElements.forEach(item => {
            fetch('https://picsum.photos/100/70')
                .then(response => {
                    if (response.status === 200) {
                        return response.url;
                    } else {
                        console.error('Не удалось получить изображение');
                    }
                })
                .then(imageUrl => {
                    item.src = imageUrl;

                })
                .catch(error => {
                    console.error('Ошибка при запросе изображения:', error);
                });
        })

    }


    addHandle() {

           const addBtns = document.querySelectorAll("#add");

           addBtns.forEach(item => {
               item.addEventListener('click',  (e) => {
                   this.basketList.addItem(e.target);
               })
           })

        const searchForm = document.querySelector(".searchForm");

        searchForm.addEventListener('submit', (e)=> {
            e.preventDefault();
            console.log(e.target);
            let value = document.querySelector(".searchInput").value;
            console.log(value);
            this.selectItems(value);
        })

    }

    selectItems(value) {
            let regEx = new RegExp(value, "i");

        this.filtered = this.goods.filter(item =>
        {
            return regEx.test(item.product_name) ||
            item.product_name.includes(value)


        }
        );

        console.log(this.filtered);

        this.goods.forEach(item => {
            let cardEl = document.querySelector(`.card-${item.id_product}`);

            if(!this.filtered.includes(item)) {
                cardEl.classList.add("invisible");

            } else {
                cardEl.classList.remove("invisible");
            }
        })
    }
}