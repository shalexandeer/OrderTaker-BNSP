import { addRestaurantSchema, deleteRestaurantSchema, updateRestaurantSchema } from '@/schema/restaurant';
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant } from '@/services/restaurant.service';
import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';

export const handleGetRestaurant = createHandler(
  async (req, res) => {
    const restaurants = await getAllRestaurants();

    res.status(200).json({
      success: true,
      message: 'Restaurants fetched successfully',
      data: restaurants,
    });
  },
);

export const handleGetRestaurantById = createHandler(
  async (req, res) => {
    const { id: routeId } = req.params;

    if (!routeId) {
      throw new BackendError('BAD_REQUEST', {
        message: 'Missing ids',
      });
    }

    const restaurant = await getRestaurantById(routeId);

    if (!restaurant) {
      throw new BackendError('NOT_FOUND', {
        message: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Restaurant fetched successfully',
      data: restaurant,
    });
  },
);

export const handleAddRestaurant = createHandler(addRestaurantSchema, async (req, res) => {
  const { name, branch } = req.body;

  const newRestaurant = await createRestaurant({
    name,
    branch,
  });

  if (!newRestaurant) {
    throw new BackendError('CONFLICT', {
      message: 'Restaurant already exists',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Restaurant created successfully',
    data: newRestaurant,
  });
});

export const handleUpdateRestaurant = createHandler(updateRestaurantSchema, async (req, res) => {
  const { id: routeId } = req.params;
  const { name, branch } = req.body;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing ids',
    });
  }

  const updatedRestaurant = await updateRestaurant(routeId, {
    name,
    branch,
  });

  if (!updatedRestaurant) {
    throw new BackendError('NOT_FOUND', {
      message: 'Restaurant not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Restaurant updated successfully',
    data: updatedRestaurant,
  });
});

export const handleDeleteRestaurant = createHandler(deleteRestaurantSchema, async (req, res) => {
  const { id: routeId } = req.params;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing ids',
    });
  }

  const deletedRestaurant = await deleteRestaurant(routeId);

  if (!deletedRestaurant) {
    throw new BackendError('NOT_FOUND', {
      message: 'Restaurant not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Restaurant deleted successfully',
    data: deletedRestaurant,
  });
});
