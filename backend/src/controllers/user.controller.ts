import { Buffer } from 'node:buffer';
import argon2 from 'argon2';
import {
  type User,
  deleteUserSchema,
  loginSchema,
  newUserSchema,
  updateUserSchema,
} from '@/schema/user';

import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';
import generateToken from '@/utils/jwt';
import { addUser, deleteUser, getUserByEmail, updateUser } from '@/services/user.service';

export const handleUserLogin = createHandler(loginSchema, async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user)
    throw new BackendError('USER_NOT_FOUND');

  const matchPassword = await argon2.verify(user.password, password, {
    salt: Buffer.from(user.salt, 'hex'),
  });
  if (!matchPassword)
    throw new BackendError('INVALID_PASSWORD');

  const token = generateToken(user.id);
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: { token },
  });
});

export const handleAddUser = createHandler(newUserSchema, async (req, res) => {
  const user = req.body;

  const existingUser = await getUserByEmail(user.email);

  if (existingUser) {
    throw new BackendError('CONFLICT', {
      message: 'User already exists',
    });
  }

  const { user: addedUser } = await addUser(user);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: addedUser,
  });
});

export const handleDeleteUser = createHandler(deleteUserSchema, async (req, res) => {
  const { email } = req.body;

  const { user } = res.locals as { user: User };

  if (user.email !== email && !user.isAdmin) {
    throw new BackendError('UNAUTHORIZED', {
      message: 'You are not authorized to delete this user',
    });
  }

  const deletedUser = await deleteUser(email);
  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser,
  });
});

export const handleUpdateUser = createHandler(updateUserSchema, async (req, res) => {
  const { user } = res.locals as { user: User };

  const { name, email, password } = req.body;

  const updatedUser = await updateUser(user, {
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

export const handleGetUser = createHandler(async (req, res) => {
  const { user } = res.locals as { user: User };

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };

  res.status(200).json({
    success: true,
    message: 'User fetched successfully',
    data: userData,
  });
});
