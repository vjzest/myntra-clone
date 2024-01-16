let bagItems;

onLoad();

function onLoad() {
  let bagItemStr = localStorage.getItem('bagItems');
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayItemsHome(items); // Pass the 'items' array to the function
  displayBagIcon();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector('.bag-item-count');

  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = 'hidden';
  }
}

function displayItemsHome(items) {
  let itemsContainerElement = document.querySelector('.items-container');
  
  if (!itemsContainerElement) {
    return;
  }

  let innerHtml = '';
  items.forEach(item => {
    innerHtml += `<div class="item-container">
      <img class="item-img" src="${item.image}" alt="item image">
      <div class="rating">
        ${item.rating.stars}⭐|${item.rating.count}
      </div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.name}</div> <!-- Corrected this line -->
      <div class="prices">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
      </div>
      <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
    </div>`;
  });

  itemsContainerElement.innerHTML = innerHtml;
}
