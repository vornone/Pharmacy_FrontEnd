export const mainData = []
for (let i = 0; i < 200; i++) {
  mainData.push({
    product_id: i,
    product_price: `${(Math.random() * 11).toFixed(2)}`,
    product_name: `Product ${i + 1}`,
    product_img:
      'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    product_minimum_stock: `${(Math.random() * 100).toFixed(0)}`,
    orderQuantity: 0
  })
}
export const orderData = []

export const userData = [
  {
    user_id: 1,
    user_name: 'admin',
    user_password: 'admin',
    user_role: 'admin'
  },
  {
    user_id: 2,
    user_name: 'user',
    user_password: 'user',
    user_role: 'user'
  }
]
