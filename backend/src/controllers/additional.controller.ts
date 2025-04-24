import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';
import { addAdditionalSchema, deleteAdditionalSchema, updateAdditionalSchema } from '@/schema/additional';
import { createAdditional, deleteAdditional, getAdditionalById, getAdditionalsByFoodId, getAllAdditionals, updateAdditional } from '@/services/additional.service';
import { getFoodById } from '@/services/food.service';

export const handleGetAdditionals = createHandler(
  async (req, res) => {
    const additionals = await getAllAdditionals();

    res.status(200).json({
      success: true,
      message: 'Additionals fetched successfully',
      data: additionals,
    });
  },
);

export const handleGetAdditionalById = createHandler(
  async (req, res) => {
    const { id: routeId } = req.params;

    if (!routeId) {
      throw new BackendError('BAD_REQUEST', {
        message: 'Missing id',
      });
    }

    const additional = await getAdditionalById(routeId);

    if (!additional) {
      throw new BackendError('NOT_FOUND', {
        message: 'Additional not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Additional fetched successfully',
      data: additional,
    });
  },
);

export const handleGetAdditionalByFoodId = createHandler(
  async (req, res) => {
    const { foodId } = req.params;

    if (!foodId) {
      throw new BackendError('BAD_REQUEST', {
        message: 'Missing foodId',
      });
    }

    const existingFoods = await getFoodById(foodId);

    if (!existingFoods) {
      throw new BackendError('NOT_FOUND', {
        message: 'Food not found',
      });
    }

    const additionals = await getAdditionalsByFoodId(foodId);

    res.status(200).json({
      success: true,
      message: 'Additionals fetched successfully',
      data: additionals,
    });
  },
);

export const handleAddAdditional = createHandler(addAdditionalSchema, async (req, res) => {
  const { foodId, name, price } = req.body;

  const existingFoods = await getFoodById(foodId);

  if (!existingFoods) {
    throw new BackendError('NOT_FOUND', {
      message: 'Food not found',
    });
  }

  const newAdditional = await createAdditional({
    foodId,
    name,
    price,
  });

  if (!newAdditional) {
    throw new BackendError('CONFLICT', {
      message: 'Additional already exists',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Additional created successfully',
    data: newAdditional,
  });
});

export const handleUpdateAdditional = createHandler(updateAdditionalSchema, async (req, res) => {
  const { id: routeId } = req.params;
  const { name, price } = req.body;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing id',
    });
  }

  const updatedAdditional = await updateAdditional(routeId, {
    name,
    price,
  });

  if (!updatedAdditional) {
    throw new BackendError('NOT_FOUND', {
      message: 'Additional not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Additional updated successfully',
    data: updatedAdditional,
  });
});

export const handleDeleteAdditional = createHandler(deleteAdditionalSchema, async (req, res) => {
  const { id: routeId } = req.params;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing id',
    });
  }

  const deletedAdditional = await deleteAdditional(routeId);

  if (!deletedAdditional) {
    throw new BackendError('NOT_FOUND', {
      message: 'Additional not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Additional deleted successfully',
    data: deletedAdditional,
  });
});
