import { deleteOrderItemSchema } from './../schema/orderItem';
import { addOrderItemSchema } from '@/schema/orderItem';
import { addOrderItem, deleteOrderItem, getOrderItemsByOrderId } from '@/services/orderItem.service';
import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';

export const handleGetOrderItems = createHandler(async (req, res) => {
  const { id: orderId } = req.params;

  if (!orderId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing order id',
    });
  }

  const orderItems = await getOrderItemsByOrderId(orderId);

  if (!orderItems) {
    throw new BackendError('NOT_FOUND', {
      message: 'Order items not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Order items fetched successfully',
    data: orderItems,
  });
});

export const handleAddOrderItem = createHandler(addOrderItemSchema, async (req, res) => {
  const { id: orderId } = req.params;
  const { foodId, quantity, notes } = req.body;

  if (!orderId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing order id',
    });
  }

  if (!foodId || !quantity || !notes) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing required fields',
    });
  }

  const existingOrderItems = await getOrderItemsByOrderId(orderId);
  const isFoodIdExist = existingOrderItems.some(item => item.foodId === foodId);

  if (isFoodIdExist) {
    throw new BackendError('CONFLICT', {
      message: 'Food ID must be unique in the order',
    });
  }

  const newOrderItem = await addOrderItem(orderId, req.body);

  if (!newOrderItem) {
    throw new BackendError('CONFLICT', {
      message: 'Failed to create order item',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Order item created successfully',
    data: newOrderItem,
  });
});

export const handleDeleteOrderItem = createHandler(deleteOrderItemSchema, async (req, res) => {
  const { id: orderId } = req.params;
  const { id } = req.body;

  if (!orderId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing required ids',
    });
  }

  const existingOrderItems = await getOrderItemsByOrderId(orderId);
  const isItemIdExist = existingOrderItems.some(item => item.id === id);

  if (!isItemIdExist) {
    throw new BackendError('NOT_FOUND', {
      message: 'Order item not found',
    });
  }

  const deletedOrderItem = await deleteOrderItem(orderId, id);

  if (!deletedOrderItem) {
    throw new BackendError('CONFLICT', {
      message: 'Failed to delete order item',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Order item deleted successfully',
    data: deletedOrderItem,
  });
});
