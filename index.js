const data = [
  {
    category: 'CLOTHING',
    product: [
      {
        name: 'DENIM SHIRT',
        description: 'Oversized denim shirt. Long sleeves with button fastening. Classic collar and pockets on the front. Fastening with metal buttons.',
        price: '1990 UAH',
      },
      {
        name: 'FLOWERS MINI DRESS',
        description: 'Mini dress with floral print. Straps, imitation of cups and corsets.',
        price: '1790 UAH',
      },
        {
        name: 'MID-WAIST JEANS',
        description: 'OStraight jeans of the Premium denim collection. Mid-waiit and five pockets. Zipper and button closure.',
        price: '1990 UAH',
      },
    ]
  },
  {
    category: 'SHOES',
    product: [
      {
        name: 'LACE-UP HEELS',
        description: 'Lace-up heels. Square nose. Ties.',
        price: '2990 UAH',
      },
      {
        name: 'BASIC SNEAKERS',
        description: 'Basic women\'s sneakers made of genuine leather. Inside is natural soft leather. Rubber sole.',
        price: '2990 UAH',
      },
        {
        name: 'LOAFERS',
        description: 'Massive loafers made of genuine leather. Three-dimensional sole and lacing in tone. Minimalist design. On the model size 38.',
        price: '3290 UAH',
      },
    ]
  },
  {
    category: 'BAGS',
    product: [
      {
        name: 'CLUTCH BAG',
        description: 'A small handbag from the Coach collection. The button-up model is made of genuine leather. Magnetic clasp. Not designed for A4 format. Long adjustable strap that fastens. Bag for carrying over the shoulder or in the hands.',
        price: '1500 UAH',
      },
      {
        name: 'BAGUETTE BAG',
        description: 'A medium-sized bag for every day. It has a side pocket inside for small things. Adjustable shoulder strap. Fastens with a magnet.',
        price: '1290 UAH',
      },
        {
        name: 'MINI HOBO BAG',
        description: 'The Hammock Hobo deconstructs the iconic bag family\'s shape-shifting design to create a versatile and ergonomic hobo bag with a distinctive sling shape.',
        price: '1390 UAH',
      },
    ]
  }
];

const LOCAL_STORAGE_DATA_VALUES = 'dataValues';

let userOrders = [];

const main = document.querySelector('#main');

function resetPage() {
  main.innerHTML = '';

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('description-container');
  main.append(descriptionContainer);

  data.forEach((category) => {
    const container = document.createElement('div');
    const categories = document.createElement('div');
    const products = document.createElement('div');

    container.classList.add('container');
    categories.classList.add('category');
    products.classList.add('product');

    categories.innerText = category.category;
    container.append(categories);

    categories.addEventListener('click', () => {
      products.innerHTML = '';
      descriptionContainer.innerHTML = '';

      category.product.forEach((item) => {
        const product = document.createElement('div');
        const productName = document.createElement('p');
        const productInfo = document.createElement('div');

        product.classList.add('product-item');
        productName.classList.add('product-name');
        productInfo.classList.add('product-info');

        productName.innerText = item.name;

        productName.addEventListener('click', () => {
          const description = document.createElement('p');
          const price = document.createElement('p');
          const buyButton = document.createElement('button');
          buyButton.innerText = 'Buy';

          description.innerHTML = item.description;
          price.innerHTML = item.price;

          buyButton.addEventListener('click', () => {
            const formContainer = document.querySelector('.form-container');
            formContainer.style.display = 'block';

            descriptionContainer.innerHTML = '';

            chosenProduct = {
              name: item.name,
              price: item.price,
              description: item.description
            };
          });

          descriptionContainer.addEventListener('click', resetPage);

          descriptionContainer.append(description);
          descriptionContainer.append(price);
          descriptionContainer.append(buyButton);
          product.append(descriptionContainer);
        });

        productInfo.append(productName);
        product.append(productName);
        products.append(product);
      });

      container.append(products);
    });

    main.append(container);
  });
}

resetPage();

const cities = ['Kyiv', 'Odesa', 'Kharkiv', 'Dnipro', 'Chernihiv', 'Lutsk', 'Rivne', 'Zhytomyr', 'Sumy', 'Poltava', 'Khemlnytskyi', 'Ternopil', 'Lviv', 'Vinnytsia', 'Ivano-Frankivsk', 'Cherkasy', 'Uzhorod', 'Chernivtsi', 'Kropyvnytskyi', 'Donetsk', 'Luhansk', 'Kryvyi Rih', 'Zaporizhzhia', 'Mykolaiv', 'Kherson', 'Simferopol'];
const dropdownElement = document.getElementById('city');

cities.forEach(city => {
  const option = document.createElement('option');
  option.value = city;
  option.text = city;
  dropdownElement.add(option);
});

document.querySelector('#submit-btn').addEventListener('click', submitClick);

function submitClick() {
  const name = document.querySelector('#name').value;
  const city = document.querySelector('#city').value;
  const postDetails = document.querySelector('.post-details').value;
  const paymentMode = document.querySelector('.payment-mode:checked').value;
  const productNumber = document.querySelector('.product-number').value;
  const comment = document.querySelector('.comment-item').value;

  const data = { name, city, postDetails, paymentMode, productNumber, comment };

  if (!name || !city || !postDetails || !paymentMode || !productNumber) {
    alert('Please fill in all the fields!');
    return;
  }

  data.productInfo = `Product's name: ${chosenProduct.name}\nPrice: ${chosenProduct.price}\nDescription: ${chosenProduct.description}`

  const orderData = {
    Order: chosenProduct.name, 
    date: new Date().toLocaleDateString(),
    price: chosenProduct.price,
    dataValues: data,
  };

  userOrders.push(orderData);
  addNewOrderToLocalStorage(orderData);
  renderTable(data);
}

function renderTable(data) {
  const formContainer = document.querySelector('.form-container');
  const tableContainer = document.querySelector('.table-container');

  main.style.display = 'none';
  formContainer.style.display = 'none';
  tableContainer.style.display = 'block';

  const table = document.getElementById('table');
  table.innerHTML = '';
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const theadTitles = ['Name', 'City', 'Delivery details', 'Mode of Payment', 'Amount of product', 'Comment', 'Chosen product'];

  theadTitles.forEach(theadTitle => {
    const th = document.createElement('th');
    th.innerText = theadTitle;
    tr.appendChild(th);
  });

  thead.appendChild(tr);

  const tbody = document.createElement('tbody');
  const datatr = document.createElement('tr');

  const dataValues = [
    data.name,
    data.city,
    data.postDetails,
    data.paymentMode,
    data.productNumber,
    data.comment,
    data.productInfo 
  ];

  dataValues.forEach(value => {
    const td = document.createElement('td');
    td.innerText = value;
    datatr.appendChild(td);
  });

  tbody.appendChild(datatr);

  table.appendChild(thead);
  table.appendChild(tbody);

  addNewOrderToLocalStorage(dataValues);
  
}

function loadOrdersFromLocalStorage() {
  const dataValues = localStorage.getItem(LOCAL_STORAGE_DATA_VALUES);
  if (dataValues) {
    userOrders = JSON.parse(dataValues);
  }
}

loadOrdersFromLocalStorage();

document.querySelector('#order-btn').addEventListener('click', displayOrdersList);

function displayOrdersList() {
  const formContainer = document.querySelector('.form-container');
  const orderContainer = document.querySelector('.orders-container');
  
  main.style.display = 'none';
  formContainer.style.display = 'none';
  orderContainer.style.display = 'block';

  const orderListUl = document.createElement('ul');
  orderListUl.innerHTML = '';
  orderListUl.classList.add('order-block');

  userOrders.forEach((order, index) => {
    if (order.dataValues) {
      const orderItem = document.createElement('li');
      const deleteBtn = document.createElement('img');

      orderItem.classList.add('list-item');
      deleteBtn.classList.add('delete');

      deleteBtn.src = 'ios-close-circle-outline.svg';

      deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); 
        removeOrder(index);
      });

      orderItem.innerHTML = `Your order: ${order.Order}, Date of the order: ${order.date}\nPrice: ${order.price}`;
      orderItem.addEventListener('click', () => {
        displayOrderDetails(order.dataValues);
      });
      
      orderItem.appendChild(deleteBtn);
      orderListUl.appendChild(orderItem);
    }
  });

  orderContainer.innerHTML = '';
  orderContainer.appendChild(orderListUl);
}

function removeOrder(index) {
  userOrders.splice(index, 1); 
  localStorage.setItem(LOCAL_STORAGE_DATA_VALUES, JSON.stringify(userOrders));

  displayOrdersList();
}

function displayOrderDetails(dataValues) {
  const formContainer = document.querySelector('.form-container');
  const orderContainer = document.querySelector('.orders-container');
  const tableContainer = document.querySelector('.table-container');
  
  main.style.display = 'none';
  formContainer.style.display = 'none';
  orderContainer.style.display = 'none';
  tableContainer.style.display = 'block';

  renderTable(dataValues);
}

function addNewOrderToLocalStorage(item) {
  const dataValues = localStorage.getItem(LOCAL_STORAGE_DATA_VALUES);
  const updateOrders = dataValues ? [item, ...JSON.parse(dataValues)] : [item];

  localStorage.setItem(LOCAL_STORAGE_DATA_VALUES, JSON.stringify(updateOrders));
}












// function removeOrderFromLocalStorage(id) {
//   const removeDataId = localStorage.getItem(LOCAL_STORAGE_REMOVE_DATA_VALUES);
//   const updateOrdersId = removeDataId ? JSON.parse(removeDataId) : [];
//   updateOrdersId.push(id);
//   localStorage.setItem(LOCAL_STORAGE_REMOVE_DATA_VALUES, JSON.stringify(updateOrdersId));
// }
  


