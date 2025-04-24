import { and, eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { type NewOrderItem, orderItems } from '@/schema/orderItem';
import { orders } from '@/schema/order';
import { foods } from '@/schema/food';

export async function getOrderItemsByOrderId(orderId: string) {
  return await db.select({
    id: orderItems.id,
    orderId: orderItems.orderId,
    foodId: orderItems.foodId,
    quantity: orderItems.quantity,
    price: orderItems.price,
    notes: orderItems.notes,
  })
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));
}

export async function addOrderItem(orderId: string, data: NewOrderItem) {
  const food = await db.select({
    price: foods.price,
  })
    .from(foods)
    .where(eq(foods.id, data.foodId))
    .limit(1);

  if (!food[0])
    throw new Error('Food not found');

  const [newItem] = await db
    .insert(orderItems)
    .values({
      orderId,
      foodId: data.foodId,
      quantity: data.quantity,
      price: food[0].price * data.quantity!,
      notes: data.notes,
    })
    .returning();

  return newItem;
}

export async function deleteOrderItem(orderId: string, itemId: string) {
  const [deletedItem] = await db
    .delete(orderItems)
    .where(and(
      eq(orderItems.id, itemId),
      eq(orderItems.orderId, orderId),
    ))
    .returning();

  if (!deletedItem)
    throw new Error('Order item not found');

  return deletedItem;
}
