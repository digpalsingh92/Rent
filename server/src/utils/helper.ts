import jwt from 'jsonwebtoken';
import { env } from '../config/env.config';
import { UserRole, PropertyPermission, rolePermissions } from './permission';

interface User {
  id: string;
  role: string;
}

const generateJwtToken = (user: User) => {
  return jwt.sign(
    { id: user.id,
     role: user.role},
    env.JWT_SECRET as string,
    {expiresIn: '7d'}
);
};
export default generateJwtToken;

export function hasPermission(
  role: UserRole,
  permission: PropertyPermission
): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}