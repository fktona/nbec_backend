import { Router } from 'express';
import AdminController from './admin.controller';
import { createAdminSchema, loginAdminSchema } from '@/schema/admin.schema';
import { validateData } from '@/middlewares/zod-validator';
import { authMiddleware } from '@/middlewares/auth';

const admin: Router = Router();
const adminController = new AdminController();

/**
 * Create Admin Body
 * @typedef {object} CreateAdminBody
 * @property {string} name.required - Name of the admin - example: Jane Doe
 * @property {string} username.required - Username of the admin - example: admin123
 * @property {string} email.required - Email address of the admin - example: jane.doe@example.com
 * @property {string} password.required - Password for the admin - example: securePassword123
 * @property {string} role - Role of the admin - example: superadmin
 */

/**
 * Admin
 * @typedef {object} Admin
 * @property {string} id - Admin ID - example: 123e4567-e89b-12d3-a456-426614174000
 * @property {string} name - Name of the admin - example: Jane Doe
 * @property {string} username - Username of the admin - example: admin123
 * @property {string} email - Email address of the admin - example: jane.doe@example.com
 * @property {string} role - Role of the admin - example: superadmin
 * @property {string} createdAt - Creation timestamp - example: 2024-12-19T00:00:00.000Z
 * @property {string} updatedAt - Update timestamp - example: 2024-12-19T00:00:00.000Z
 */

/**
 * POST /admin
 * @summary Create Admin
 * @tags admin
 * @param {CreateAdminBody} request.body.required
 * @return {Admin} 201 - Admin created successfully
 * @example request - Example request body
 * {
 *   "name": "Jane Doe",
 *   "username": "admin123",
 *   "email": "jane.doe@example.com",
 *   "password": "securePassword123",
 *   "role": "superadmin"
 * }
 * @example response - Example response body
 * {
 *   "id": "123e4567-e89b-12d3-a456-426614174000",
 *   "name": "Jane Doe",
 *   "username": "admin123",
 *   "email": "jane.doe@example.com",
 *   "role": "superadmin",
 *   "createdAt": "2024-12-19T00:00:00.000Z",
 *   "updatedAt": "2024-12-19T00:00:00.000Z"
 * }
 */
admin.post('/', validateData(createAdminSchema), adminController.createAdmin);

/**
 * POST /admin/login
 * @summary Login Admin
 * @tags auth
 * @param {loginAdminSchema} request.body.required
 * @return {Admin} 200 - Admin logged in successfully
 * @example request - Example request body
 * {
 *   "username": "admin123",
 *   "password": "securePassword123"
 * }
 * @example response - Example response body
 * {
 *   "id": "123e4567-e89b-12d3-a456-426614174000",
 *   "name": "Jane Doe",
 *   "username": "admin123",
 *   "email": "jane.doe@example.com",
 *   "role": "superadmin",
 *   "createdAt": "2024-12-19T00:00:00.000Z",
 *   "updatedAt": "2024-12-19T00:00:00.000Z",
 *   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
admin.post(
  '/login',
  validateData(loginAdminSchema),
  adminController.adminLogin
);

/**
 * GET /admin
 * @summary Get All Admins
 * @tags admin
 * @return {Array.<Admin>} 200 - Admins retrieved successfully
 */
admin.get('/', adminController.getAdmins);

/**
 * GET /admin/{id}
 * @summary Get Admin by ID
 * @tags admin
 * @param {string} id.path.required - Admin ID
 * @return {Admin} 200 - Admin retrieved successfully
 */
admin.get('/:id', adminController.getAdminById);

/**
 * GET /admin/username/{username}
 * @summary Get Admin by Username
 * @tags admin
 * @param {string} username.path.required - Admin Username
 * @return {Admin} 200 - Admin retrieved successfully
 * @return {Error} 404 - Admin not found
 * @example response - Example response body
 *
 */
admin.get('/username/:username', adminController.getAdminByUsername);
/**
 * PATCH /admin/{id}
 * @summary Update Admin
 * @tags admin
 * @param {string} id.path.required - Admin ID
 * @param {CreateAdminBody} request.body.required
 * @return {Admin} 200 - Admin updated successfully
 * @example request - Example request body
 * {
 *   "name": "Jane Doe",
 *   "username": "admin123",
 *   "email": "jane.doe@example.com",
 *   "role": "superadmin"
 * }
 */
admin.patch('/:id', adminController.updateAdmin);

/**
 * DELETE /admin/{id}
 * @summary Delete Admin
 * @tags admin
 * @param {string} id.path.required - Admin ID
 * @return {Admin} 200 - Admin deleted successfully
 */
admin.delete('/:id', adminController.deleteAdmin);

/**
 * POST /admin/verify
 * @summary Verify Admin
 * @tags admin
 * @protected true
 * @security BearerAuth
 * @return {Admin} 200 - Admin verified successfully
 */

admin.post('/verify', authMiddleware, adminController.verifyAdmin);

export default admin;
