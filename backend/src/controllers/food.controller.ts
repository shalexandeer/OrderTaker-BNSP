import { addFoodSchema, deleteFoodSchema, updateFoodSchema } from '@/schema/food';
import { createFood, deleteFood, getAllFoods, getFoodById, getFoodsByCategory, getFoodsBySearch, updateFood } from '@/services/food.service';
import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';

export const handleGetAllFoods = createHandler(
  async (req, res) => {
    const { page, pageSize, orderBy, isAscending, querySearch, categoryId } = req.query;

    if (!page || !pageSize) {
      res.status(400).json({
        success: false,
        message: 'Missing required parameters: page and pageSize',
      });
    }
    const foods = await getAllFoods({
      page: Number(page),
      pageSize: Number(pageSize),
      orderBy: orderBy as string,
      isAscending: isAscending === 'true',
      querySearch: querySearch as string,
    }, categoryId as string | null);

    res.status(200).json({
      success: true,
      message: 'Foods fetched successfully',
      data: foods.data,
      pagination: foods.pagination,
    });
  },
);

export const handleGetFoodById = createHandler(
  async (req, res) => {
    const { id: routeId } = req.params;

    if (!routeId) {
      throw new BackendError('BAD_REQUEST', {
        message: 'Missing food ID',
      });
    }

    const food = await getFoodById(routeId);

    if (!food) {
      throw new BackendError('NOT_FOUND', {
        message: 'Food not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Food fetched successfully',
      data: food,
    });
  },
);

export const handleGetFoodsByCategory = createHandler(async (req, res) => {
  const { page, pageSize, orderBy, isAscending, querySearch } = req.query;

  if (!page || !pageSize) {
    res.status(400).json({
      success: false,
      message: 'Missing required parameters: page and pageSize',
    });
  }

  const { categoryId } = req.params;

  if (!categoryId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing category ID',
    });
  }

  const foods = await getFoodsByCategory({
    page: Number(page),
    pageSize: Number(pageSize),
    orderBy: orderBy as string,
    isAscending: isAscending === 'true',
    querySearch: querySearch as string,
  }, categoryId);

  if (!foods) {
    throw new BackendError('NOT_FOUND', {
      message: 'No foods found for this category',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Foods by category fetched successfully',
    data: foods.data,
    pagination: foods.pagination,
  });
});

export const handleAddFood = createHandler(addFoodSchema, async (req, res) => {
  const { name, categoryId, description, img, price, availability } = req.body;

  const newFood = await createFood({
    name,
    categoryId,
    description,
    img,
    price: Number(price),
    availability,
  });

  if (!newFood) {
    throw new BackendError('CONFLICT', {
      message: 'Food already exists',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Food created successfully',
    data: newFood,
  });
});

// Update an existing food item
export const handleUpdateFood = createHandler(updateFoodSchema, async (req, res) => {
  const { id: routeId } = req.params;
  const { name, categoryId, description, img, price, availability } = req.body;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing food ID',
    });
  }

  const updatedFood = await updateFood(routeId, {
    name,
    categoryId,
    description,
    img,
    price: Number(price), // Ensure price is treated as a number
    availability,
  });

  if (!updatedFood) {
    throw new BackendError('NOT_FOUND', {
      message: 'Food not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Food updated successfully',
    data: updatedFood,
  });
});

// Delete a food item
export const handleDeleteFood = createHandler(deleteFoodSchema, async (req, res) => {
  const { id: routeId } = req.params;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing food ID',
    });
  }

  const deletedFood = await deleteFood(routeId);

  if (!deletedFood) {
    throw new BackendError('NOT_FOUND', {
      message: 'Food not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Food deleted successfully',
    data: deletedFood,
  });
});
