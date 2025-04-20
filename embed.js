
function flipCard(button) {
  const card = button.closest('.card-container').querySelector('.flip-card');
  card.classList.toggle('flipped');


}

function sendOrderToWhatsApp() {
  const wrappers = document.querySelectorAll('.item-wrapper');
  let message = '*New Order:*%0A';

  wrappers.forEach(wrapper => {
      const name = wrapper.querySelector('h1.resulte')?.textContent || '';
      const count = wrapper.querySelector('span.resulte')?.textContent || '1';
      const price = wrapper.querySelector('h1.price')?.textContent || '';

      message += `• ${name} x${count} - ${price}%0A`;
  });

  // Optional: total sum (if you have one)
  const total = document.getElementById('total')?.textContent;
  if (total) {
      message += `%0A*Total:* ${total}`;
  }

  // WhatsApp number (international format, no + or spaces)
  const phoneNumber = '+221762357329'; // Replace with actual number

  // Open WhatsApp link
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}




function scrollToAndBack(elementId) {
  const originalY = window.scrollY;
  const target = document.getElementById(elementId);
  if (!target) return;

  // Scroll to the element
  target.scrollIntoView({ behavior: 'smooth' });

  // After 2 seconds, scroll back to the original position
  setTimeout(() => {
    window.scrollTo({ top: originalY, behavior: 'smooth' });
  }, 2000); // you can adjust this to 2500 or 3000 if needed
}



function updateTotal() {
  let total = 0;

  // Get all h1 elements with class 'price'
  const prices = document.querySelectorAll('.price');

  // Loop through each and add to total
  prices.forEach(price => {
    const num = parseInt(price.textContent);
    if (!isNaN(num)) {
      total += num;
    }
  });

  // Update the element with id="total"
  const totalElement = document.getElementById('total-price');
  if (totalElement) {
    totalElement.textContent = total;
  }
}


function cbg(button) {
  


// Go to the card-back div
const cardBack = button.closest('.card-back');

// Get the previous sibling, which is card-front
const cardFront = cardBack.previousElementSibling;

// Find the span with class 'item' inside card-front
const item = cardFront.querySelector('.item');
const itemx = cardFront.querySelector('.itemx');

if (item && itemx && itemx.textContent == '' ) {
    itemx.textContent = item.textContent;
    button.closest('.card-back').style.borderColor = 'white';
    cardFront.style.borderColor = 'white';
    button.closest('.card-back').querySelector('.back').style.display = 'none';
    animateCart();
    scrollToAndBack('select');
    
    
    
}
else if (item && itemx && itemx.textContent != '' ) {
    itemx.textContent = '';
    button.closest('.card-back').style.borderColor = 'white';
    cardFront.style.borderColor = 'white';
    button.closest('.card-back').querySelector('.back').style.display = 'block';
    
    
    
}
}
// Declare this outside the function to persist between calls
const itemCounts = new Map();

function renderItemsToSelect() {
const selectDiv = document.getElementById('select');
const items = document.querySelectorAll('.itemx');

// Clear previous content
selectDiv.innerHTML = '';



items.forEach(item => {
    const text = item.textContent.trim();
    if (text !== '') {
        // Hide the card container
        const cardContainer = item.closest('.card-container');
        const price = cardContainer.querySelector('.itemy');
        

        if (cardContainer) {

            cardContainer.style.display = 'none';
             
   
        }

        const priceValue = parseInt(price.textContent); // ✅ Get unique price for this item
        let count = itemCounts.get(text) || 1;
        
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'item-wrapper';
        wrapper.style.marginBottom = '10px';
        
        // Create h1 for name
        const h1 = document.createElement('h1');
        h1.textContent = text;
        h1.classList.add('resulte');
        
        // Create h1x for price display
        const h1x = document.createElement('h1');
        h1x.textContent = `${priceValue * count} cfa`;
        h1x.classList.add('price');
        
        // Counter display
        const counter = document.createElement('span');
        counter.textContent = `${count}`;
        counter.style.margin = '0 10px';
        counter.classList.add('resulte');
        
        // Plus button
        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.onclick = () => {
            count++;
            itemCounts.set(text, count);
            counter.textContent = `${count}`;
            h1x.textContent = `${priceValue * count} cfa`;  // ✅ using correct price
            updateTotal();
        };
        
        // Minus button
        const minusBtn = document.createElement('button');
        minusBtn.textContent = '-';
        minusBtn.onclick = () => {
            if (count > 1) {
                count--;
                itemCounts.set(text, count);
                counter.textContent = `${count}`;
                h1x.textContent = `${priceValue * count} cfa`;  // ✅ also update here
                updateTotal();
            }
        };
        
        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'x';
        removeBtn.style.marginLeft = '10px';
        removeBtn.style.borderColor = 'red';
        removeBtn.style.color = 'red';
        removeBtn.onclick = () => {
            wrapper.remove();
            itemCounts.delete(text); // Remove count data

            document.querySelectorAll('.itemx').forEach(el => {
                if (el.textContent.trim() === text) {
                    el.textContent = '';

                    const container = el.closest('.card-container');
                    if (container) {
                        container.style.display = 'block';

                        const back = container.querySelector('.back');
                        if (back) back.style.display = 'block';

                        const selectBtn = container.querySelector('.selectButton');
                        if (selectBtn) selectBtn.textContent = '+';

                        flipCard(el);
                        updateTotal();
                    }
                }
            });
        };

        // Append everything
        wrapper.appendChild(h1);
        wrapper.appendChild(h1x);
        wrapper.appendChild(minusBtn);
        wrapper.appendChild(counter);
        wrapper.appendChild(plusBtn);
        wrapper.appendChild(removeBtn);
        selectDiv.appendChild(wrapper);
        // After adding a new item with h1x
        updateTotal();

    }
});
}


function show(event) {
const results = document.querySelectorAll('.resulte');
const listDone = document.getElementById('list_done');

// Clear previous content
listDone.innerHTML = '';

// Create table and body
const table = document.createElement('table');
table.classList.add('table', 'table-bordered');

// Create header
const headerRow = document.createElement('tr');
const thNumbers = document.createElement('th');
thNumbers.textContent = 'quantity';
const thWords = document.createElement('th');
thWords.textContent = 'object';
headerRow.appendChild(thWords);
headerRow.appendChild(thNumbers);

table.appendChild(headerRow);

// Create two separate rows
const numberRow = document.createElement('tr');
const numberCell = document.createElement('td');
const wordCell = document.createElement('td');
const wordList = document.createElement('ul');
const numberList = document.createElement('ul');


results.forEach(result => {
const text = result.textContent.trim();

if (!isNaN(text) && text !== '') {
  const li = document.createElement('li');
  li.textContent = text;
  numberList.appendChild(li);
} else if (text !== '') {
  const li = document.createElement('li');
  li.textContent = text;
  wordList.appendChild(li);
}
});
wordCell.appendChild(wordList);
numberCell.appendChild(numberList);


numberRow.appendChild(wordCell);
numberRow.appendChild(numberCell);
table.appendChild(numberRow);

listDone.appendChild(table);
}


document.addEventListener('click', function(event) {
if (event.target.tagName === 'BUTTON') {
show(event);
}
});


function animateCart() {
const icon = document.getElementById('cart-icon');

// Add the class to trigger animation
icon.classList.add('show');

// Remove the class after animation ends (1s)
setTimeout(() => {
icon.classList.remove('show');
}, 1000);
}


