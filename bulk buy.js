<script>
document.addEventListener("DOMContentLoaded", function() {
    let variantDropdown = document.querySelector(".product-variants select");
    
    if (variantDropdown) {
        let parentDiv = variantDropdown.closest(".product-options");
        let newVariantContainer = document.createElement("div");
        newVariantContainer.id = "custom-variant-list";
        
        let variants = Array.from(variantDropdown.options).slice(1);
        
        variants.forEach(variant => {
            let variantValue = variant.value;
            let variantName = variant.text;

            let variantRow = document.createElement("div");
            variantRow.classList.add("variant-row");
            
            variantRow.innerHTML = `
                <label>${variantName}</label>
                <input type="number" id="qty-${variantValue}" class="variant-qty" min="0" value="0" style="width: 50px; margin-left: 10px;">
            `;
            
            newVariantContainer.appendChild(variantRow);
        });

        parentDiv.appendChild(newVariantContainer);

        let addAllButton = document.createElement("button");
        addAllButton.textContent = "Add All to Cart";
        addAllButton.style.cssText = "margin-top: 10px; display: block; padding: 8px 15px; background: #ff5722; color: white; border: none; cursor: pointer;";
        parentDiv.appendChild(addAllButton);

        addAllButton.addEventListener("click", function() {
            variants.forEach(variant => {
                let variantValue = variant.value;
                let qtyInput = document.getElementById(`qty-${variantValue}`);
                let quantity = parseInt(qtyInput.value);

                if (quantity > 0) {
                    addToCart(variantValue, quantity);
                }
            });
        });

        function addToCart(variantId, quantity) {
            fetch("/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    variant_id: variantId,
                    quantity: quantity
                })
            }).then(response => response.json())
            .then(data => console.log(`Added ${quantity} of ${variantId} to cart`))
            .catch(error => console.error("Error adding to cart:", error));
        }
    }
});
</script>
