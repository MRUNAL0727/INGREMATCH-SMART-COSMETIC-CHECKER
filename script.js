async function checkProduct() {
  const input = document.getElementById("product-name");
  const resultDiv = document.getElementById("result");

  if (!input || !resultDiv) {
    console.error("DOM elements not found.");
    return;
  }

  const productName = input.value.trim();
  if (!productName) {
    resultDiv.innerHTML = "❗ Please enter a product name.";
    resultDiv.style.display = "block"; // ✅ Show the result box for message
    return;
  }

  try {
    const response = await fetch("http://localhost:5001/check_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product_name: productName })
    });

    const data = await response.json();

    if (data.available) {
      resultDiv.innerHTML = `
        ✅ <b>${data.product_name}</b> is available.<br>
        <b>Label:</b> ${data.label}<br>
        <b>Price:</b> ${data.price}<br>
        <b>Ingredients:</b> ${data.ingredients}<br>
        <b>Suitable for:</b><br>
        Oily: ${data.skin_types.Oily}, 
        Dry: ${data.skin_types.Dry}, 
        Sensitive: ${data.skin_types.Sensitive}, 
        Normal: ${data.skin_types.Normal}, 
        Combination: ${data.skin_types.Combination}
      `;
    } else {
      resultDiv.innerHTML = "❌ Product not found.";
    }

    resultDiv.style.display = "block"; // ✅ Show result box after setting content

  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = "⚠️ Server error. Please try again.";
    resultDiv.style.display = "block"; // ✅ Show error message
  }
}