export class Product {
    constructor(item) {
        this.id = item.id_product;
        this.img = item.img;
        this.name = item.product_name;
        this.price = item.price;
    }

    render() {
        return `  <div class="card-${this.id} shadow p-3 d-flex flex-column" style="width: 18rem;">
                    <img  src='' class = "img-${this.id}" alt="Случайное изображение">
                    <div class="card-body">
                        <p  class="card-id" data-id="${this.id}"></p>       
                        <h5 class="card-title" data-name="${this.name}">${this.name}</h5>
                        <p  class="card-price" data-price = "${this.price}">${this.price}</p>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button id="add" class="btn btn-primary">Add to basket</button>
                    </div>
                  </div>`
    }
}