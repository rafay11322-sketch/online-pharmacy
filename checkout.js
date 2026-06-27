// =====================================
// ShopEase Pharmacy Checkout
// =====================================

const DELIVERY_CHARGE = 200;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load Order Summary
function loadCheckout() {

    const checkoutItems = document.getElementById("checkoutItems");

    const subtotalElement = document.getElementById("checkoutSubtotal");

    const totalElement = document.getElementById("checkoutTotal");

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        subtotalElement.innerText = "Rs. 0";
        totalElement.innerText = "Rs. 0";

        return;
    }

    let subtotal = 0;

    cart.forEach(item => {

        const total = item.price * item.quantity;

        subtotal += total;

        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <span>

                ${item.name}

                <br>

                <small>

                    Qty: ${item.quantity}

                </small>

            </span>

            <span>

                Rs. ${total}

            </span>

        </div>

        `;

    });

    const grandTotal = subtotal + DELIVERY_CHARGE;

    subtotalElement.innerText = "Rs. " + subtotal;

    totalElement.innerText = "Rs. " + grandTotal;

}

loadCheckout();


// =====================================
// Place Order
// =====================================

const form = document.getElementById("checkoutForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    if(cart.length === 0){

        alert("Your cart is empty.");

        return;

    }

    const fullName = form.querySelector('input[placeholder="Full Name"]').value;

    const phone = form.querySelector('input[placeholder="Phone Number"]').value;

    const email = form.querySelector('input[placeholder="Email Address"]').value;

    const address = form.querySelector("textarea").value;

    const city = form.querySelector('input[placeholder="City"]').value;

    const postalCode = form.querySelector('input[placeholder="Postal Code"]').value;

    const paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });

    const total = subtotal + DELIVERY_CHARGE;

    const order = {

        orderId: Date.now(),

        customer: {

            fullName,

            phone,

            email,

            address,

            city,

            postalCode

        },

        paymentMethod,

        items: cart,

        subtotal,

        delivery: DELIVERY_CHARGE,

        total,

        status: "Pending",

        orderDate: new Date().toLocaleString()

    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    alert("🎉 Order placed successfully!");

    window.location.href = "index.html";

});
