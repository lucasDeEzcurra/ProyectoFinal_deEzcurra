let products = [
  {
    name: 'Camionero',
    price: 2500,
    change: 'ARS',
    img: '../images/producto5.png',
    id: 1,
  },
  {
    name: 'Camionero Black',
    price: 2000,
    change: 'ARS',
    img: '../images/producto6.png',
    id: 2,
  },
  {
    name: 'Camionero Brown',
    price: 2700,
    change: 'ARS',
    img: '../images/producto7.png',
    id: 3,
  },
  {
    name: 'Torpedo Delux',
    price: 10000,
    change: 'ARS',
    img: '../images/producto8.png',
    id: 4,
  },
  {
    name: 'Torpedo',
    price: 3500,
    change: 'ARS',
    img: '../images/producto9.png',
    id: 5,
  },
  {
    name: 'Imperial',
    price: 7500,
    change: 'ARS',
    img: '../images/producto1.png',
    id: 6,
  },
  {
    name: 'Imperial Premium',
    price: 12500,
    change: 'ARS',
    img: '../images/producto2.png',
    id: 7,
  },
  {
    name: 'Torpedo Cuero',
    price: 5500,
    change: 'ARS',
    img: '../images/producto3.png',
    id: 8,
  },
]

var myHeaders = new Headers()
myHeaders.append('apikey', 'X8kz2IlzEMAIAEryH2toMqDNTfxjPfqz')

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
}

let index = { ARS: 0, USD: 1, EUR: 1, GBP: 1, JPY: 1 }
const loadrates = async () => {
  for (k in index) {
    console.log('ashjdkkjhasd', k)
    if (k !== 'USD') {
      await fetch(
        `http://localhost:3000/convert?to=${k}&from=USD&amount=1`,
        // `https://api.apilayer.com/exchangerates_data/convert?to=${k}&from=USD&amount=1`,
        requestOptions,
      )
        .then((res) => res.json())
        .then((data) => {
          index[k] = data.result
        })
        .catch((err) => console.log(err))
    }
  }
}
function getPrice(to, from, amount) {
  return (amount / index[from]) * index[to]
}
loadrates()

const currencySelect = document.getElementById('currency-select')

currencySelect.addEventListener('change', function () {
  products.forEach((e) => {
    e.price = getPrice(this.value, e.change, e.price)
    e.change = this.value
  })
  printProducts()
  uploadCart()
})

let cartJSON = localStorage.getItem('cart')
let cart = JSON.parse(cartJSON)
if (cart == null) {
  cart = []
}

const divProducts = document.getElementById('products')
const divtotalPrice = document.getElementById('total-price')
const productsCart = document.getElementById('products-cart')
const cartCountSpan = document.getElementById('cartCount')

const addProductToCart = (product) => {
  let sameProduct = cart.find((p) => p.id == product.id)

  if (sameProduct) {
    sameProduct.quantity ? sameProduct.quantity++ : (sameProduct.quantity = 2)
    saveCartInSession(cart)
    countCartItems()
    uploadCart()
    return
  }
  product.quantity = 1
  cart.push(product)
  uploadCart()
  countCartItems()
  saveCartInSession(cart)
}

const createProductDiv = (product) => {
  const divProduct = document.createElement('DIV')
  divProduct.classList.add('col', 'mb-5')

  const divCard = document.createElement('DIV')
  divCard.classList.add('card', 'h-100')

  const productImg = document.createElement('IMG')
  productImg.classList.add('card-img-top')

  const divCardBody = document.createElement('DIV')
  divCardBody.classList.add('card-body', 'p-4')

  const divCardTextCenter = document.createElement('DIV')
  divCardBody.classList.add('text-center')

  const h5 = document.createElement('H5')
  h5.classList.add('fw-bolder')

  const divCardFooter = document.createElement('DIV')
  divCardFooter.classList.add(
    'card-footer',
    'p-4',
    'pt-0',
    'border-top-0',
    'bg-transparent',
  )

  const divCardFooterInside = document.createElement('DIV')
  divCardFooterInside.classList.add('text-center')

  const divCardFooterButton = document.createElement('A')

  divCardFooterButton.addEventListener('click', (e) =>
    addProductToCart(product),
  )

  divCardFooterButton.classList.add('btn', 'btn-outline-dark', 'mt-auto')
  //   divCardFooterButton.setAttribute('href', '#')
  addToCart = document.createTextNode('Add to cart')
  divCardFooterButton.appendChild(addToCart)

  // CARD BODY
  const price = document.createTextNode(`$${product.price}`)
  const name = document.createTextNode(product.name)
  h5.appendChild(name)
  divCardTextCenter.appendChild(h5)
  divCardTextCenter.appendChild(price)
  divCardBody.appendChild(divCardTextCenter)

  //CARD FOOTER
  divCardFooterInside.appendChild(divCardFooterButton)
  divCardFooter.appendChild(divCardFooterInside)

  //CARD IMG
  productImg.setAttribute('src', product.img)

  divCard.appendChild(productImg)
  divCard.appendChild(divCardBody)
  divCard.appendChild(divCardFooter)

  divProduct.appendChild(divCard)

  return divProduct
}

const createCartDiv = (product) => {
  const divCartProduct = document.createElement('DIV')
  divCartProduct.classList.add('col', 'mb-5')

  const divCard = document.createElement('DIV')
  divCard.classList.add('card', 'h-100')

  const productImg = document.createElement('IMG')
  productImg.classList.add('card-img-top')

  const divCardBody = document.createElement('DIV')
  divCardBody.classList.add('card-body', 'p-4')

  const divCardTextCenter = document.createElement('DIV')
  divCardBody.classList.add('text-center')

  const h5 = document.createElement('H5')
  h5.classList.add('fw-bolder')

  const divCardFooter = document.createElement('DIV')
  divCardFooter.classList.add(
    'card-footer',
    'p-4',
    'pt-0',
    'border-top-0',
    'bg-transparent',
  )

  const divCardFooterInside = document.createElement('DIV')
  divCardFooterInside.classList.add('text-center')

  const divCardFooterButton = document.createElement('A')
  divCardFooterButton.addEventListener('click', (e) => {
    delFromCart(product)
  })

  divCardFooterButton.classList.add('btn', 'btn-outline-dark', 'mt-auto')
  divCardFooterButton.setAttribute('href', '#')
  deleteFromCart = document.createTextNode('Delete From Cart')
  divCardFooterButton.appendChild(deleteFromCart)

  // CARD BODY
  const price = document.createTextNode(`$${product.price}`)
  const name = document.createTextNode(product.name)
  h5.appendChild(name)
  divCardTextCenter.appendChild(h5)
  divCardTextCenter.appendChild(price)
  divCardBody.appendChild(divCardTextCenter)

  //CARD FOOTER
  divCardFooterInside.appendChild(divCardFooterButton)
  divCardFooter.appendChild(divCardFooterInside)

  //CARD IMG
  productImg.setAttribute('src', product.img)

  divCard.appendChild(productImg)
  divCard.appendChild(divCardBody)
  divCard.appendChild(divCardFooter)

  if (product.quantity && product.quantity > 1) {
    let quantity = document.createElement('DIV')
    quantity.classList.add('align-center')
    quantity.innerHTML = product.quantity
    divCard.appendChild(quantity)
  }

  divCartProduct.appendChild(divCard)

  return divCartProduct
}

const countCartItems = () => {
  let cartItems = 0
  cart.map((e) => (cartItems += e.quantity))
  cartCountSpan.innerHTML = cartItems
}

const sumTotalPrice = () => {
  let total = 0
  cart.map((e) => {
    totalProduct = e.quantity ? e.quantity * e.price : e.price
    total += totalProduct
  })
  return total
}

const uploadCart = () => {
  productsCart.innerHTML = ''
  for (product of cart) {
    const divProduct = createCartDiv(product)
    productsCart.appendChild(divProduct)
  }
  let total = sumTotalPrice()
  divtotalPrice.innerHTML = `El PRECIO TOTAL DE LOS PRODUCTOS ES ${total}$`
}

const delFromCart = (product) => {
  if (product.quantity > 1) {
    product.quantity--
    uploadCart()
    saveCartInSession(cart)
    countCartItems()
    return
  }
  cart = cart.filter((e) => e !== product)
  saveCartInSession(cart)

  uploadCart()
  countCartItems()
}

const saveCartInSession = (cart) => {
  const newCartJSON = JSON.stringify(cart)
  localStorage.setItem('cart', newCartJSON)
}

const printProducts = () => {
  divProducts.innerHTML = ''
  for (product of products) {
    const divProduct = createProductDiv(product)
    divProducts.appendChild(divProduct)
  }
}
printProducts()
uploadCart()
countCartItems()
