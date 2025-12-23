window.dataLayer = window.dataLayer || [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
            items: [{
                item_id: id,
                item_name: name,
                price: price,
                quantity: 1
            }]
        }
    });

    alert("Item added to cart");
}

function viewCart() {
    dataLayer.push({ event: "view_cart" });
}

function checkout() {
    dataLayer.push({ event: "begin_checkout" });
}

function purchase() {
    dataLayer.push({
        event: "purchase",
        ecommerce: {
            value: cart.reduce((t, i) => t + i.price, 0),
            currency: "INR",
            items: cart
        }
    });
    localStorage.clear();
}
