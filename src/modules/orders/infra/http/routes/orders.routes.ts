import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import OrdersController from '../controller/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get(
  '/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().items({
        id: Joi.string().uuid().required(),
        quantity: Joi.number().required(),
      }),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
