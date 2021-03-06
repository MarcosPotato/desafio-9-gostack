import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IOrderProducts{
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,

    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order | undefined> {
    const customer = await this.customersRepository.findById(customer_id)
    
    if(!customer){
      throw new AppError("Invalid customer selected", 400)
    }

    const productsList = await this.productsRepository.findAllById(products)
    
    products.forEach(addedProduct => {
      const existProduct = productsList.find(product => product.id === addedProduct.id)
      
      if(!existProduct){
        throw new AppError(`You can't add a inexistent product`, 400)
      }

      if(existProduct.quantity < addedProduct.quantity){
        throw new AppError(`You doesn't have fund for add this product`, 400)
      }
    })

    
    const orderProducts: IOrderProducts[] = []
    const updatedProducts: IProduct[] = []
    
    products.forEach(updatedProduct => {
      const product = productsList.find(product => product.id === updatedProduct.id)
      
      if(product){
        orderProducts.push({
          product_id: product.id,
          price: product.price,
          quantity: updatedProduct.quantity
        })

        updatedProducts.push({
          id: product.id,
          quantity: product.quantity - updatedProduct.quantity
        })
      }
    })
    
    const newOrder = await this.ordersRepository.create({
      customer,
      products: orderProducts
    })

    await this.productsRepository.updateQuantity(updatedProducts)

    return newOrder
  }
}

export default CreateOrderService;
