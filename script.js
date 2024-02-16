document.addEventListener("DOMContentLoaded", function () {
  const productData = {
    product: {
      id: 6937548554342,
      title: "Embrace Sideboard",
      description:
        "<p>The Embrace Sideboard is a stylish wear. With a top cloth designed to provide superior protection and look great, this storage solution is both functional and attractive. It fits seamlessly into any home decor, with clean lines and a timeless look. Crafted from premium materials for a combination of style, durability, and reliability.</p>",
      vendor: "Marmeto",
      product_type: "Cloth",
      price: "$12999.00",
      compare_at_price: "$19999.00",
      options: [
        {
          name: "Color",
          position: 1,
          values: [
            {
              Yellow: "#ECDECC",
            },
            {
              Green: "#BBD278",
            },
            {
              Blue: "#BBC1F8",
            },
            {
              Pink: "#FFD3F8",
            },
          ],
        },
        {
          name: "Size",
          position: 2,
          values: ["Small", "Medium", "Large", "Extra large", "XXL"],
        },
      ],
      images: [
        {
          src: "image1.png",
        },
        {
          src: "image2.png",
        },
        {
          src: "image3.png",
        },
        {
          src: "image1.png",
        },
      ],
    },
  };

  // Populate product details
  const product = productData.product;
  document.getElementById("vendor").textContent = product.vendor;
  document.getElementById("title").textContent = product.title;
  document.getElementById("price").textContent = product.price;
  document.getElementById("compare-at-price").textContent =
    product.compare_at_price;
  document.getElementById("description").innerHTML = product.description;

  // Calculate and display percentage off
  const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
  const compareAtPrice = parseFloat(
    product.compare_at_price.replace(/[^0-9.-]+/g, "")
  );
  const percentageOff = Math.round(
    ((compareAtPrice - price) / compareAtPrice) * 100
  );
  document.getElementById(
    "percentage-off"
  ).textContent = `${percentageOff}% off`;

  // Populate main product image
  const mainImage = document.getElementById("main-image");
  mainImage.src = product.images[0].src;

  // Populate thumbnail images
  const thumbnailsContainer = document.querySelector(".thumbnails");
  product.images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    imgElement.addEventListener("click", () => {
      mainImage.src = image.src;
    });
    thumbnailsContainer.appendChild(imgElement);
  });

  // Populate color options
  let k = 1;
  const colorOptions = product.options.find(
    (option) => option.name === "Color"
  ).values;
  const colorSelector = document.querySelector(".color-selector");
  colorOptions.forEach((colorOption) => {
    const colorDiv = document.createElement("div");
    const colorName = Object.keys(colorOption)[0];
    colorDiv.style.backgroundColor = colorOption[colorName];
    let previousColorDiv = null;

    // colorName    .id = color1;
    // colorDiv.addEventListener("click", () => {
    //   // Save selected color
    //   if (previousColorDiv != null) {
    //     const checkMark = document.createElement("div");
    //     checkMark.innerHTML = "&#10003";
    //     colorDiv.append(checkMark);
    //     previousColorDiv.classList.remove("centerMark");
    //     colorDiv.classList.add("centerMark");
    //     console.log(previousColorDiv);
    //     previousColorDiv = colorDiv;
    //   } else {
    //     const checkMark = document.createElement("div");
    //     checkMark.innerHTML = "&#10003";
    //     colorDiv.append(checkMark);
    //     colorDiv.classList.add("centerMark");
    //     previousColorDiv = colorDiv;
    //   }
    colorDiv.id = k;
    colorDiv.classList.add("color-select");
    k++;
    // });
    colorSelector.appendChild(colorDiv);
  });

  // Populate size options
  const sizeOptions = product.options.find(
    (option) => option.name === "Size"
  ).values;
  const sizeSelector = document.querySelector(".size-selector");
  sizeOptions.forEach((size) => {
    const radioWrapper = document.createElement("div");
    radioWrapper.className = "size-option";

    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = `size-${size}`;
    radioInput.name = "size";
    radioInput.value = size;
    radioInput.classList.add("size-radio");

    const radioLabel = document.createElement("label");
    radioLabel.htmlFor = `size-${size}`;
    radioLabel.textContent = size;
    radioLabel.classList.add("size-label");

    radioWrapper.appendChild(radioInput);
    radioWrapper.appendChild(radioLabel);

    sizeSelector.appendChild(radioWrapper);
  });

  // Add to cart functionality
  let previousSelect = null;
  let currSelect = null;
  const colorSelect = document.querySelector(".color-selector");
  colorSelect.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("color-select")) {
      if (!clickedElement.classList.contains("color-selected")) {
        // Deselect the previously selected element
        if (previousSelect !== null) {
          const previousSelectedElement =
            document.getElementById(previousSelect);
          previousSelectedElement.classList.remove("color-selected");
          previousSelectedElement.innerHTML = "";
        }

        // Select the clicked element
        clickedElement.classList.add("color-selected");
        currSelect = clickedElement.id;
        clickedElement.innerHTML = "&check;";

        // Update previousSelect
        previousSelect = clickedElement.id;
      } else {
        // Deselect the clicked element
        clickedElement.classList.remove("color-selected");
        clickedElement.innerHTML = "";

        // Reset previousSelect
        previousSelect = null;
      }
    }
  });
  let selectSize = null;
  const sizeSelect = document.querySelectorAll(".size-radio");

  sizeSelect.forEach((radioButton) => {
    radioButton.addEventListener("click", function (event) {
      const labelId = event.target.getAttribute("id");
      const label = document.querySelector(`label[for="${labelId}"]`);

      // Extract the text content of the label
      console.log(label.innerHTML);
      selectSize = label.innerHTML;

      //   console.log(labelText);
    });
  });

  //   console.log(previousSelect);
  //   console.log(selectSize);
  const addToCartButton = document.querySelector(".add-to-cart");
  const addToCartMessage = document.getElementById("add-to-cart-message");
  addToCartButton.addEventListener("click", (event) => {
    // Save selected size and quantity
    console.log(selectSize);
    console.log(currSelect);
    if (selectSize === null || currSelect === null) {
      alert("Please Select a Size and Color!");
    } else {
      const selectedSize = sizeSelect.value;
      const selectedQuantity = document.getElementById("quantity").value;
      // Display add to cart message
      let SelectedColor = null;
      if (currSelect == 1) SelectedColor = "Yellow";
      else if (currSelect == 2) SelectedColor = "Green";
      else if (currSelect == 3) SelectedColor = "Blue";
      else if (currSelect == 4) SelectedColor = "Pink";
      addToCartMessage.textContent = `Embrace Sideboard with Color ${SelectedColor} and Size ${selectSize} added to cart`;
      addToCartMessage.classList.remove("hidden");
    }
  });
});
