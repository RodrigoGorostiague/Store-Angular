export interface DetailOrders {
  details: Detail[];
  orderId: number,

}

export interface Order {
  id: number,
  name: string,
  date: string,
  shippingAddress: string,
  city: string,
  isDelivery: boolean
}
export interface Detail{
  productId: number,
  productName: string,
  quantity: number
}
