import { Router } from 'express';

import users from './users/users.route';
import students from './students/students.route';
import blogs from './blogs/blogs.route';
import testimonial from './testimonials/testimonials.route';
import admin from './admin/admin.route';
import successStories from './successStory/successStory.route';
import AdminController from './admin/admin.controller';
import { authMiddleware } from '@/middlewares/auth';

const router: Router = Router();

router.use('/users', users);
router.use('/students', students);
router.use('/blogs', blogs);
router.use('/testimonials', testimonial);
// router.use("/projects", projects);
router.use('/admin', admin);
router.use('/success-stories', successStories);

export default router;
