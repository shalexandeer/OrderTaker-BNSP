import { eq, inArray } from 'drizzle-orm';
import type { NewOrder, UpdateOrder, addOrderSchema } from './../schema/order';
import { type Order, orders } from '@/schema/order';
import { db } from '@/utils/db';
import { meja } from '@/schema/meja';
import { foods, type foods as typeFood } from '@/schema/food';
import { orderItems } from '@/schema/orderItem';
import { additional } from '@/schema/additional';
import { BackendError } from '@/utils/errors';

export async function getAllOrders(status?: 'pending' | 'approved' | 'preparing' | 'completed' | 'cancelled') {
  return await db.select({
    id: orders.id,
    mejaId: orders.mejaId,
    paymentMethod: orders.paymentMethod,
    status: orders.status,
    updatedAt: orders.updatedAt,
    createdAt: orders.createdAt,
  }).from(orders).where(status ? eq(orders.status, status) : undefined);
}

export async function getOrderById(id: string) {
  const [order] = await db.select({
    id: orders.id,
    mejaId: orders.mejaId,
    customerName: orders.customerName,
    customerEmail: orders.customerEmail,
    paymentMethod: orders.paymentMethod,
    status: orders.status,
    totalPrice: orders.totalPrice,
    updatedAt: orders.updatedAt,
    createdAt: orders.createdAt,
  }).from(orders).where(eq(orders.id, id)).limit(1);
  return order;
}

export async function addOrder(data: NewOrder) {
  const { items, ...orderData } = data;
  let calculatedPrice = 0;
  let additionalItemMap: { [x: string]: any };
  let additionalPriceMap: { [x: string]: any };

  const [table] = await db.select().from(meja).where(eq(meja.id, orderData.mejaId)).limit(1);

  if (!table || table.status !== 'available')
    throw new Error('Table is not available');

  // 2. validate all food items
  const foodIds = items.map(item => item.foodId);
  const availableFoods = await db.select().from(foods).where(inArray(foods.id, foodIds));

  if (availableFoods.length !== items.length)
    throw new Error('Some food items are not available');

  const foodPriceMap = Object.fromEntries(
    availableFoods.map(food => [food.id, food.price]),
  );

  // 3. validate additional items
  const allAdditionalIds = items.flatMap(item => item.additionalIds || []);
  if (allAdditionalIds.length > 0) {
    const availableAdditionals = await db.select().from(additional).where(inArray(additional.id, allAdditionalIds));
    const additionalSet = new Set(availableAdditionals.map(a => a.id));

    additionalItemMap = Object.fromEntries(
      availableAdditionals.map(add => [add.id, { name: add.name, foodId: add.foodId }]),
    );

    additionalPriceMap = Object.fromEntries(
      availableAdditionals.map(add => [add.id, add.price]),
    );

    if (allAdditionalIds.some(id => !additionalSet.has(id))) {
      throw new BackendError('BAD_REQUEST', {
        message: 'Some additional items are not available',
      });
    }
  }

  // calculate food price and additional price
  items.forEach((item) => {
    let additionalPrice: number = 0;
    const foodPrice = foodPriceMap[item.foodId] || 0;

    item.additionalIds?.forEach((additionalId: string) => {
      additionalPrice += additionalPriceMap[additionalId] || 0;
    });

    calculatedPrice += (foodPrice + (additionalPrice ?? 0)) * (item.quantity || 1);
  });

  // // Begin transaction
  return await db.transaction(async (tx) => {
    const [newOrder] = await tx.insert(orders).values({
      ...orderData,
      totalPrice: calculatedPrice,
    }).returning({
      id: orders.id,
      mejaId: orders.mejaId,
      customerName: orders.customerName,
      customerEmail: orders.customerEmail,
      paymentMethod: orders.paymentMethod,
      status: orders.status,
      totalPrice: orders.totalPrice,
      updatedAt: orders.updatedAt,
      createdAt: orders.createdAt,
    });

    if (!newOrder)
      throw new Error('Failed to create order');

    // Create order items
    const orderItemsData = items.map((item) => {
      let formattedNotes = item.notes || '';
      const price = foodPriceMap[item.foodId];
      if (price === undefined)
        throw new Error(`Price not found for food item: ${item.foodId}`);

      item.additionalIds?.forEach((additionalId: string) => {
        formattedNotes += `, ${additionalItemMap[additionalId].name}`;
      });

      return {
        orderId: newOrder.id,
        foodId: item.foodId,
        quantity: item.quantity || 1,
        price: price * (item.quantity || 1),
        notes: formattedNotes,
      };
    });

    // Insert all order items
    const newOrderItems = await tx.insert(orderItems).values(orderItemsData).returning();
    return {
      ...newOrder,
      items: newOrderItems.map(item => ({
        id: item.id,
        orderId: item.orderId,
        foodId: item.foodId,
        quantity: item.quantity,
        price: item.price,
        notes: item.notes,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    };
  });
}

/**
 * Delete an order by ID
 */
export async function deleteOrder(id: string) {
  const deletedOrder = await db.delete(orders).where(eq(orders.id, id)).returning();

  if (!deletedOrder)
    throw new Error('Failed to delete order');

  return deletedOrder;
}
