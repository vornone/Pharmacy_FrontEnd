export const hello = []
for (let i = 0; i < 20; i++) {
  hello.push({
    id: i,
    price: `${(Math.random() * 11).toFixed(2)}`,
    name: `Product ${i + 1}`,
    image:
      'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: `${(Math.random() * 100).toFixed(0)}`,
    orderQuantity: 1
  })
}
export const orderData = []
