import { addOrderSchema, deleteOrderSchema } from './../schema/order';
import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';
import { addOrder, deleteOrder, getAllOrders, getOrderById, updateStatus } from '@/services/order.service';
import { getOrderItemsByOrderId } from '@/services/orderItem.service';

export const handleGetOrders = createHandler(async (req, res) => {
  const { page, pageSize, orderBy, isAscending, querySearch, status } = req.query;

  const validStatus = status as 'pending' | 'approved' | 'preparing' | 'completed' | 'cancelled' | undefined;

  const orders = await getAllOrders({
    page: Number(page),
    pageSize: Number(pageSize),
    orderBy: orderBy as string,
    isAscending: isAscending === 'true',
    querySearch: querySearch as string,
  }, ['pending', 'approved', 'preparing', 'completed', 'cancelled'].includes(status as string) ? validStatus : undefined);

  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders.data,
    pagination: orders.pagination,
  });
});

export const handleGetOrderById = createHandler(async (req, res) => {
  const { id: routeId } = req.params;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing ids',
    });
  }

  const order = await getOrderById(routeId);

  if (!order) {
    throw new BackendError('NOT_FOUND', {
      message: 'Order not found',
    });
  }

  const orderItems = await getOrderItemsByOrderId(routeId);

  res.status(200).json({
    success: true,
    message: 'Order fetched successfully',
    data: {
      ...order,
      items: orderItems,
    },
  });
});

export const handleAddOrder = createHandler(addOrderSchema, async (req, res) => {
  const { mejaId, customerName, customerEmail, paymentMethod, status } = req.body;

  const newOrder = await addOrder({
    mejaId,
    customerName,
    customerEmail,
    paymentMethod,
    status: status || 'pending', // Default to 'pending' if not provided
    items: req.body.items,
  });

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: newOrder,
  });
});

export const handleUpdateStatus = createHandler(async (req, res) => {
  const { id: routeId } = req.params;
  const { status } = req.body;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing ids',
    });
  }

  const updatedOrder = await updateStatus(status, routeId);

  if (!updatedOrder) {
    throw new BackendError('NOT_FOUND', {
      message: 'Order not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Order updated successfully',
    data: updatedOrder,
  });
});

export const handleDeleteOrder = createHandler(deleteOrderSchema, async (req, res) => {
  const { id: routeId } = req.params;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing ids',
    });
  }

  const deletedOrder = await deleteOrder(routeId);

  if (!deletedOrder) {
    throw new BackendError('NOT_FOUND', {
      message: 'Order not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Order deleted successfully',
    data: deletedOrder,
  });
});
