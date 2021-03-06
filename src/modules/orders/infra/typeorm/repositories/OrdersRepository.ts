import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const newOrder = this.ormRepository.create({
      order_products: products,
      customer,
    })

    console.log("criando")
    console.log(newOrder)

    await this.ormRepository.save(newOrder)

    return newOrder
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ["order_products", "customer"]
    })

    return order
  }
}

export default OrdersRepository;
