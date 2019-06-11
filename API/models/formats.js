const user = {
  id: 'k2n0huyndcothee160392g7hdju65h4j', // The user id
  email: 'some@email.com', // The user email
  password: 'some hashed password',
  tokens: [
    {
      id: 'qap697w8v7naztgp40nbmhclau4yoftqp',
      expirationDate: '2019-05-15T08:38:31.152Z'
    }
  ],
  oderHistory: [
    'vut4xeouulkot0nobvadrshttfffam2j' // A order id
  ],
  reviews: [
    '52ci1v89nsx6o0lqz7mm1sg0ysv4a5zhf' // A review id
  ],
  registerDate: '2019-05-14T14:27:23.566Z', // date in iso format
  lastActiveDate: '2019-05-14T14:27:23.566Z', // date in iso format
  address: {
    country: 'Netherlands',
    city: 'Barendrecht', // A city
    postcode: '2992GJ', // A postcode
    houseNumber: 92, // A house number as a integer
  },
  notifications: [
    {
      id: 'v1mxnjurqqneca5jbuh4bw2jocjfcepw4', // The notification id
      message: 'Your "13b titanium apex seals 6 pack" has been delivered', // The message
      icon: 'DeliveredIcon' // The name of the message icon
    }
  ]
}

const order = {
  id: 'nayi8g8zta1j0harfhffbaq81xjfch5d', // The id of the order
  orderer: 'k2n0huyndcothee160392g7hdju65h4j', // The id of the user who placed the order
  oderDate: '2019-05-14T14:27:23.566Z', // The date of ordering
  products: [
    {
      id: 'r5owm1t9hf5glusn2cnnhlwute1ooho9', // The id of the product
      version: 'i6d5ukkysxxdn6587nuv86zqgsotcie', // The id of the version
      count: 2 // The amount ordered of the particular product
    }
  ],
  shipping: 'nayi8g8zta1j0harfhffbaq81xjfch5d', // the id of the shipping method
  total: 775, // The total price of the order
  status: 'delivered', // The status of the delivery
  deliveryAddress: {
    country: 'Netherlands',
    city: 'Barendrecht', // A city
    postcode: '2992GJ', // A postcode
    houseNumber: 92, // A house number as a integer
  }
}

const review = {
  id: '52ci1v89nsx6o0lqz7mm1sg0ysv4a5zhf', // The id of the review
  product: 'r5owm1t9hf5glusn2cnnhlwute1ooho9', // The id of the product reviewed
  reviewer: 'nayi8g8zta1j0harfhffbaq81xjfch5d', // The id of the user who wrote the review
  version: '88b2pca0ynqb5bog5obl87fgo9q42142', // The version id
  rating: 8, // A rating of product, between 0 and 10
  posted: '2019-05-14T14:51:57.879Z', // The date of when the review was posted
  positives: [
    'Durability',
    'Titanium'
  ],
  negatives: [
    'Price'
  ],
  text: 'Great product, it\'s holding up great in my rx8, had to replace the previous apex seals pretty much every 6 moths and these are already in for 11 months so over great product', // The review text
  likes: 9 // The amount of people that liked the review
}

const product = {
  id: 'r5owm1t9hf5glusn2cnnhlwute1ooho9', // The id of the product
  name: '13b titanium apex seals 6 pack', // The product name
  description: 'Such good quality apex seals, you will never have to replace these, only like 3 times a year',
  categories: [
    'mjanwru5bzhaqvrzbhemmh19yzz7gegnm'
  ], // The id of the category this product is in
  reviews: [
    '52ci1v89nsx6o0lqz7mm1sg0ysv4a5zhf' // The id of the review
  ],
  preview: 'hwszciq80wsdwyi5bj3mqdri6zov592', // The id of the product shown in lists
  price: 387.50, // The price of the product
  photos: [
    '8e64wj6c55ksevsr1dop7e6qlrzv33nvc' // The id of the version specific photo
  ],
  specifications: {
    material: 'Titanium'
  }
}

const category = {
  id: 'mjanwru5bzhaqvrzbhemmh19yzz7gegnm',
  title: 'rotory\'s',
  preview: 'sx56nfghriddnmsjq02btreggsxt9j1gk'
}
