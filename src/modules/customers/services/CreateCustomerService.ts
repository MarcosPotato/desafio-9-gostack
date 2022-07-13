import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const existUser = await this.customersRepository.findByEmail(email)

    if(!!existUser){
      throw new AppError("This email is already in use", 400)
    }

    const newUser = await this.customersRepository.create({ name, email })
    
    return newUser
  }
}

export default CreateCustomerService;
