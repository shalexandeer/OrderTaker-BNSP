import { addCategorySchema, deleteCategorySchema, updateCategorySchema } from './../schema/category';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '@/services/category.service';
import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';

export const handleGetCategories = createHandler(async (req, res) => {
  const categories = await getAllCategories();

  res.status(200).json({
    success: true,
    message: 'Categories fetched successfully',
    data: categories,
  });
});

export const handleGetCategoryById = createHandler(async (req, res) => {
  const { id: routeId } = req.params;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing ids',
    });
  }

  const category = await getCategoryById(routeId);

  if (!category) {
    throw new BackendError('NOT_FOUND', {
      message: 'Category not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Category fetched successfully',
    data: category,
  });
});

export const handleAddCategory = createHandler(addCategorySchema, async (req, res) => {
  const { name, img } = req.body;

  const newCategory = await createCategory({
    name,
    img,
  });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: newCategory,
  });
});

export const handleUpdateCategory = createHandler(updateCategorySchema, async (req, res) => {
  const { id: routeId } = req.params;
  const { name, img } = req.body;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing ids',
    });
  }

  const updatedCategory = await updateCategory(routeId, {
    name,
    img,
  });

  if (!updatedCategory) {
    throw new BackendError('NOT_FOUND', {
      message: 'Category not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: updatedCategory,
  });
});

export const handleDeleteCategory = createHandler(deleteCategorySchema, async (req, res) => {
  const { id: routeId } = req.params;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing ids',
    });
  }

  const deletedCategory = await deleteCategory(routeId);

  if (!deletedCategory) {
    throw new BackendError('NOT_FOUND', {
      message: 'Category not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
    data: null,
  });
});
