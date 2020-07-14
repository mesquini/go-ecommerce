import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

interface IRequest {
  customer_id: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
}
export default class OrdersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    const findOrder = container.resolve(FindOrderService);

    const order = await findOrder.execute({ id: order_id });

    return res.status(200).json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body as IRequest;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ customer_id, products });

    return res.status(201).json(order);
  }
}
