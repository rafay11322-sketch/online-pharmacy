// ================================
// ShopEase Pharmacy Cart
// ================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const DELIVERY_CHARGE = 200;

// Display Cart Items
function displayCart() {

    const cartTable = document.getElementById("cartTable");

    cartTable.innerHTML = "";

    if (cart.length === 0) {

        cartTable.innerHTML = `
            <tr>
                <td colspan="5">
                    <h3>Your cart is empty.</h3>
                    <p>Add medicines from the products page.</p>
                </td>
            </tr>
        `;

        updateTotals();

        return;
    }

    cart.forEach(item => {

        const total = item.price * item.quantity;

        cartTable.innerHTML += `

        <tr>

            <td>

                <img src="${item.image}" width="70">

                <br><br>

                <strong>${item.name}</strong>

            </td>

            <td>

                Rs. ${item.price}

            </td>

            <td>

                <button class="qty-btn"
                onclick="decreaseQuantity(${item.id})">

                -

                </button>

                <strong>${item.quantity}</strong>

                <button class="qty-btn"
                onclick="increaseQuantity(${item.id})">

                +

                </button>

            </td>

            <td>

                Rs. ${total}

            </td>

            <td>

                <button class="remove-btn"
                onclick="removeItem(${item.id})">

                Remove

                </button>

            </td>

        </tr>

        `;

    });

    updateTotals();

}

// ================================
// Increase Quantity
// ================================

function increaseQuantity(id){

    cart = cart.map(item=>{

        if(item.id===id){

            item.quantity++;

        }

        return item;

    });

    saveCart();

}

// ================================
// Decrease Quantity
// ================================

function decreaseQuantity(id){

    cart = cart.map(item=>{

        if(item.id===id){

            if(item.quantity>1){

                item.quantity--;

            }

        }

        return item;

    });

    saveCart();

}

// ================================
// Remove Item
// ================================

function removeItem(id){

    if(confirm("Remove this medicine from cart?")){

        cart = cart.filter(item=>item.id!==id);

        saveCart();

    }

}

// ================================
// Save Cart
// ================================

function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

// ================================
// Totals
// ================================

function updateTotals(){

    let subtotal = 0;

    cart.forEach(item=>{

        subtotal += item.price * item.quantity;

    });

    let delivery = cart.length===0 ? 0 : DELIVERY_CHARGE;

    let grandTotal = subtotal + delivery;

    document.getElementById("subtotal").innerText =
    "Rs. " + subtotal;

    document.getElementById("delivery").innerText =
    "Rs. " + delivery;

    document.getElementById("grandTotal").innerText =
    "Rs. " + grandTotal;

}

// ================================
// Load Cart
// ================================

displayCart();
