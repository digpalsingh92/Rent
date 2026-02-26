import jwt from 'jsonwebtoken';
import { env } from '../config/env.config';
import {
  PropertyPermission,
  PropertyRole,
  SystemRole,
  propertyRolePermissions,
  systemRolePermissions,
} from './permission';

interface User {
  id: string;
  systemRole: string;
  email: string;
}

const generateJwtToken = (user: User) => {
  return jwt.sign(
    { id: user.id,
      email: user.email,
     role: user.systemRole},
    env.JWT_SECRET as string,
    {expiresIn: '7d'}
);
};
export default generateJwtToken;

export function hasPropertyRolePermission(
  role: PropertyRole,
  permission: PropertyPermission
): boolean {
  return propertyRolePermissions[role]?.includes(permission) ?? false;
}

export function hasSystemRolePermission(
  role: SystemRole,
  permission: PropertyPermission
): boolean {
  return systemRolePermissions[role]?.includes(permission) ?? false;
}