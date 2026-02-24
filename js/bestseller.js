const API_URL =
    "https://balipartyhire.ahaanmedia.com/wp-json/wp/v2/product?_embed&per_page=10&order=asc&orderby=date";

// ✅ ONLY THESE PRODUCTS WILL SHOW
const ALLOWED_IDS = [1447, 1452, 1453, 1454];

async function loadProducts() {
    try {
        const res = await fetch(API_URL);
        const products = await res.json();

        const grid = document.getElementById("product-bestseller");
        grid.innerHTML = "";

        // 🔥 FILTER BY ID
        const filteredProducts = products.filter(p =>
            ALLOWED_IDS.includes(p.id)
        );

        filteredProducts.forEach(product => {
            const image =
                product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "https://via.placeholder.com/400x500";

            const title = product.title.rendered;

        grid.innerHTML += `
 
<div class="w-full rounded-md shadow-sm overflow-hidden bg-transparent">

  <!-- Image Section -->
  <div class="relative bg-[#FCF4EE] h-[301px] flex items-center justify-center">

    <img
      src="${image}"
      alt="${title}"
      class="object-contain w-full h-full"
    />

    <!-- Action Icons -->
    <div class="absolute top-8 right-4 flex flex-col gap-3">
      <button type="button" class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow  border border-transparent hover:border-[#0F6B5B] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1)] hover:scale-110 transition">
        <img src="./images/wish.png" class="w-4 h-4" alt="wishlist">
      </button>

      <button type="button" class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow border border-transparent hover:border-[#0F6B5B] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1)] hover:scale-110 transition">
        <img src="./images/share.png" class="w-4 h-4" alt="share">
      </button>

      <button type="button" class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow border border-transparent hover:border-[#0F6B5B] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1)] hover:scale-110 transition">
        <img src="./images/view.png" class="w-4 h-4" alt="view">
      </button>
    </div>

    <!-- Add To Cart Button -->
    <button
      onclick="addToCart({
        id: ${product.id},
        title: \`${title}\`,
        price: 20.00,
        image: '${image}'
      })"
      class="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full flex items-center gap-2 text-[#0F6B5B] shadow  hover:scale-110 transition"
    >
      <span class="text-sm">Add To Cart</span>
      <img src="./images/cart.png" class="w-4 h-4" alt="cart">
    </button>

  </div>

  <!-- Content Section -->
  <div class="bg-transparent px-4 pb-6 text-center">

    <!-- Rating -->
    <div class="mt-6 flex justify-center gap-2 text-[#F9BF01] text-lg">
      ★ ★ ★ ★ ☆
    </div>

    <!-- Title -->
    <h3 class="mt-4 font-cormorant text-xl text-[#1c1c1c]">
      ${title}
    </h3>

    <!-- Price -->
    <div class="mt-4 flex justify-center items-center gap-2">
      <span class="text-base text-[#1c1c1c]">$20.00</span>
      <span class="text-xs text-[#5E6368] line-through">$22.00</span>
    </div>

  </div>
</div>



      `;
    });


    } catch (err) {
        console.error("Product API error:", err);
    }
}

loadProducts();
document.body.classList.add("products-loaded");
