import { addMejaSchema, deleteMejaSchema, updateMejaSchema } from '@/schema/meja';
import { createMeja, deleteMeja, getAllMeja, getMejaById, updateMeja } from '@/services/meja.service';
import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';

export const handleGetMeja = createHandler(
  async (req, res) => {
    const tables = await getAllMeja();

    res.status(200).json({
      success: true,
      message: 'Tables fetched successfully',
      data: tables,
    });
  },
);

export const handleGetMejaById = createHandler(
  async (req, res) => {
    const { id: routeId } = req.params;

    if (!routeId) {
      throw new BackendError('BAD_REQUEST', {
        message: 'Missing table ID',
      });
    }

    const table = await getMejaById(routeId);

    if (!table) {
      throw new BackendError('NOT_FOUND', {
        message: 'Table not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Table fetched successfully',
      data: table,
    });
  },
);

export const handleAddMeja = createHandler(addMejaSchema, async (req, res) => {
  const { number, capacity, status, location } = req.body;

  const existingTables = await getAllMeja();
  const isNumberExist = existingTables.some(table => table.number === number);

  if (isNumberExist) {
    throw new BackendError('CONFLICT', {
      message: 'Table number must be unique',
    });
  }

  const newTable = await createMeja({
    number,
    capacity: Number(capacity),
    status,
    location,
  });

  if (!newTable) {
    throw new BackendError('CONFLICT', {
      message: 'Failed to create table',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Table created successfully',
    data: newTable,
  });
});

export const handleUpdateMeja = createHandler(updateMejaSchema, async (req, res) => {
  const { id: routeId } = req.params;
  const { number, capacity, status, location } = req.body;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing table ID',
    });
  }

  const updatedTable = await updateMeja(routeId, {
    number,
    capacity: capacity ? Number(capacity) : undefined,
    status,
    location,
  });

  if (!updatedTable) {
    throw new BackendError('NOT_FOUND', {
      message: 'Table not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Table updated successfully',
    data: updatedTable,
  });
});

export const handleDeleteMeja = createHandler(deleteMejaSchema, async (req, res) => {
  const { id: routeId } = req.params;

  if (!routeId) {
    throw new BackendError('BAD_REQUEST', {
      message: 'Missing table ID',
    });
  }

  const deletedTable = await deleteMeja(routeId);

  if (!deletedTable) {
    throw new BackendError('NOT_FOUND', {
      message: 'Table not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Table deleted successfully',
    data: deletedTable,
  });
});
