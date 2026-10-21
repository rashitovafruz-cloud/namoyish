function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCount();
}

function updateCount() {
    const count = getCart().reduce((sum, item) => sum + item.qty, 0);

    document.querySelectorAll("#count").forEach(element => {
        element.textContent = count;
    });
}

function addCart(name, price, image) {
    const cart = getCart();
    const item = cart.find(product => product.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });
    }

    saveCart(cart);
    alert("Mahsulot savatchaga qo‘shildi!");
}

const slides = [
    {
        title: "Nike chegirmalari boshlandi 🔥",
        image: "assets/nike-qizil.jpg"
    },
    {
        title: "Har qadamda qulaylik",
        image: "assets/nike-qizil-yon.jpg"
    },
    {
        title: "Yangi uslubni tanlang",
        image: "assets/sport-krossovka.jpg"
    }
];

let currentSlide = 0;

function slide(index) {
    currentSlide = index;

    const image = document.getElementById("banner-img");
    const title = document.getElementById("banner-title");

    if (image && title) {
        image.src = slides[index].image;
        title.textContent = slides[index].title;
    }
}

if (document.getElementById("banner-img")) {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        slide(currentSlide);
    }, 4500);
}

// Mahsulotlarni qidirish
const search = document.getElementById("search");

if (search) {
    search.addEventListener("input", () => {
        const query = search.value.toLowerCase();

        document.querySelectorAll(".product").forEach(product => {
            product.style.display = product.textContent
                .toLowerCase()
                .includes(query) ? "" : "none";
        });
    });
}

updateCount();
const cartItems = document.getElementById("cart-items");

function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function formatMoney(amount) {
    return amount.toLocaleString("uz-UZ") + " so‘m";
}

function renderCart() {
    const cart = getCart();
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = 
            <div class="empty">
                Savatchangiz hozircha bo‘sh.
                <br><br>
                <a href="category.html">Mahsulotlarni ko‘rish →</a>
            </div>
        ;
    }

    cart.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = 
            <div class="item-info">
                <img src="${item.image}" alt="">
                <div>
                    <h3></h3>
                    <button class="remove" data-remove="${index}">
                        Olib tashlash
                    </button>
                </div>
            </div>

            <div class="quantity">
                <button data-change="-1" data-index="${index}">−</button>
                <span>${item.qty}</span>
                <button data-change="1" data-index="${index}">+</button>
            </div>

            <strong>${formatMoney(item.price * item.qty)}</strong>
        ;

        row.querySelector("h3").textContent = item.name;
        cartItems.appendChild(row);
    });

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty, 0
    );

    document.getElementById("subtotal").textContent =
        formatMoney(subtotal);

    document.getElementById("total").textContent =
        formatMoney(subtotal);

    document.getElementById("count").textContent =
        cart.reduce((sum, item) => sum + item.qty, 0);
}

cartItems.addEventListener("click", function(event) {
    const cart = getCart();

    const removeButton = event.target.closest("[data-remove]");
    const changeButton = event.target.closest("[data-change]");

    if (removeButton) {
        cart.splice(Number(removeButton.dataset.remove), 1);
    }

    if (changeButton) {
        const index = Number(changeButton.dataset.index);

        cart[index].qty += Number(changeButton.dataset.change);

        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
});

document.getElementById("checkout").addEventListener("click", function() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Savatchangiz bo‘sh!");
        return;
    }

    alert("Mahsulotlar tanlandi. Haqiqiy buyurtma uchun server kerak.");
});

renderCart();