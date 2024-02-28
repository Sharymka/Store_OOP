export class BasketItem {

    constructor(basketItem) {
        this.id = basketItem.id_product;
        this.name = basketItem.product_name;
        this.price = basketItem.price;
        this.quantity = basketItem.quantity;
    }
    render() {
        return `<div class="item-${this.id} basketItem">
                   <img src="#" alt="Товар">
                   <div class="product-info">
                      <h2 class = "name">${this.name}</h2>
                      <div class="price">$${this.price}</div>
                      <span class="quantity">Quantity: ${this.quantity}</span>
                   </div>
                   <div class="totalPrice">total Price: $${this.price * this.quantity}</div>
                   <div id = "${this.id}" class="delete-button">X</div>
                </div>`
    }
}