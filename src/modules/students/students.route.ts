import { Router } from 'express';
import { Students } from '@prisma/client';
import StundentsController from './students.controller';
import {
  createUserSchema,
  LoginStudentSchema,
} from '@/schema/stundents.schema';
import { validateData } from '@/middlewares/zod-validator';
const students: Router = Router();
const studentsController = new StundentsController();
/**
 * Create  student body
 * @typedef {object} CreateStudentBody
 * @property {string} firstName.required - First name of the user - example: John
 * @property {string} lastName.required - Last name of the user - example: Doe
 * @property {string} sex.required - Sex of the user - example: Male
 * @property {string} desiredCourse.required - Desired course of the user - example: Computer Science
 * @property {string} preferredInstitution.required - Preferred institution - example: MIT
 * @property {string} mobileNumber.required - Mobile number of the user - example: +1234567890
 * @property {Array.<string>} subjectCombination.required - Array of subject combinations - example: ["Mathematics", "Physics", "Chemistry"]
 * @property {string} parentsPhoneNumber.required - Parent's phone number - example: +0987654321
 * @property {number} desiredUTMEScore.required - Desired UTME score - example: 250
 * @property {boolean} doneUTMEBefore.required - Has the user done UTME before? - example: true
 * @property {number} previousScore - Previous UTME score (if applicable) - example: 200
 */

/**
 * Student
 * @typedef {object} Student
 * @property {string} firstName - First name of the user - example: John
 * @property {string} lastName - Last name of the user - example: Doe
 * @property {string} sex - Sex of the user - example: Male
 * @property {string} desiredCourse - Desired course of the user - example: Computer Science
 * @property {string} preferredInstitution - Preferred institution - example: MIT
 * @property {string} mobileNumber - Mobile number of the user - example: +1234567890
 * @property {Array.<string>} subjectCombination - Array of subject combinations - example: ["Mathematics", "Physics", "Chemistry"]
 * @property {string} parentsPhoneNumber - Parent's phone number - example: +0987654321
 * @property {number} desiredUTMEScore - Desired UTME score - example: 250
 * @property {boolean} doneUTMEBefore - Has the user done UTME before? - example: true
 * @property {number} previousScore - Previous UTME score (if applicable) - example: 200
 */

/**
 * POST /students/create
 * @summary Create Student
 * @tags students
 * @param {CreateUserBody} request.body.required
 * @return {Students} 201 - Students created successfully
 * @example request - Example request body
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "sex": "Male",
 *   "desiredCourse": "Computer Science",
 *   "preferredInstitution": "MIT",
 *   "mobileNumber": "+1234567890",
 *   "subjectCombination": ["Mathematics", "Physics", "Chemistry"],
 *   "parentsPhoneNumber": "+0987654321",
 *   "desiredUTMEScore": 250,
 *   "doneUTMEBefore": true,
 *   "previousScore": 200
 * }
 * @example response - Example response body
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "sex": "Male",
 *   "desiredCourse": "Computer Science",
 *   "preferredInstitution": "MIT",
 *   "mobileNumber": "+1234567890",
 *   "subjectCombination": ["Mathematics", "Physics", "Chemistry"],
 *   "parentsPhoneNumber": "+0987654321",
 *   "desiredUTMEScore": 250,
 *   "doneUTMEBefore": true,
 *   "previousScore": 200
 * }
 */

students.post(
  '/create',
  validateData(createUserSchema),
  studentsController.createStudents
);

/**
 * PATCH /students/approve/{id}
 * @summary Approve Students
 * @tags students
 * @param {string} id.path.required - Student ID
 * @return {Students} 202 - Students approved successfully
 */

students.patch('/approve/:id', studentsController.approveStudents);

/**
 * GET /students
 * @summary Get Students
 * @tags students
 * @return {Array.<Students>} 200 - Students retrieved successfully
 */

students.get('/', studentsController.getStudents);

/**
 * GET /students/{id}
 * @summary Get Student by ID
 * @tags students
 * @param {string} id.path.required - Student ID
 * @return {Students} 200 - Student retrieved successfully
 */

students.get('/:id', studentsController.getStudentById);

/**
 * PUT /students/{id}
 * @summary Update Student
 * @tags students
 * @param {string} id.path.required - Student ID
 * @param {CreateUserBody} request.body.required
 * @return {Students} 200 - Student updated successfully
 * @example request - Example request body
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "sex": "Male",
 *   "desiredCourse": "Computer Science",
 *   "preferredInstitution": "MIT",
 *   "mobileNumber": "+1234567890",
 *   "subjectCombination": ["Mathematics", "Physics", "Chemistry"],
 *   "parentsPhoneNumber": "+0987654321",
 *   "desiredUTMEScore": 250,
 *   "doneUTMEBefore": true,
 *   "previousScore": 200
 * }
 */

students.put('/:id', studentsController.updateStudent);

/**
 * DELETE /students/{id}
 * @summary Delete Student
 * @tags students
 * @param {string} id.path.required - Student ID
 * @return {Students} 200 - Student deleted successfully
 */

students.delete('/:id', studentsController.deleteStudent);

/**
 * GET /student/{studentId}
 * @summary Get Students by studentId
 * @tags students
 * @param {string} studentId.path.required - Student ID
 * @return {Students} 200 - Student retrieved successfully
 */

students.get('/:studentId', studentsController.getStudentByStudentId);
export default students;

/**
 * POST /students/login
 * @summary Login Student
 * @tags auth
 * @param {LoginStudentSchema} request.body.required
 * @return {Students} 200 - Student logged in successfully
 * @example request - Example request body
 * {
 *  "studentId": "123456789",
 * "password": "password"
 * }
 */
students.post(
  '/login',
  validateData(LoginStudentSchema),
  studentsController.studentLogin
);
