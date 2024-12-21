import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Students
  await prisma.students.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        studentId: 'STU12345',
        sex: 'Male',
        email: 'johndoe@example.com',
        desiredCourse: 'Computer Science',
        preferredInstitution: 'MIT',
        mobileNumber: '1234567890',
        subjectCombination: ['Mathematics', 'Physics', 'Chemistry'],
        parentsPhoneNumber: '0987654321',
        desiredUTMEScore: 300,
        doneUTMEBefore: false,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        studentId: 'STU67890',
        sex: 'Female',
        email: 'janesmith@example.com',
        desiredCourse: 'Engineering',
        preferredInstitution: 'Harvard',
        mobileNumber: '0987654321',
        subjectCombination: ['Biology', 'Chemistry', 'English'],
        parentsPhoneNumber: '1234567890',
        desiredUTMEScore: 320,
        doneUTMEBefore: true,
        previousScore: 280,
      },
    ],
  });

  // Seed Blogs
  await prisma.blog.createMany({
    data: [
      {
        title: 'The Future of Education',
        content: 'Education is evolving with technology...',
      },
      {
        title: 'Top 10 Universities Worldwide',
        content: 'Discover the leading institutions around the globe...',
      },
    ],
  });

  // Seed Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        content: 'This platform changed my life!',
        role: 'Student',
        company: 'Tech Academy',
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
        content: 'An incredible learning experience!',
        role: 'Instructor',
        company: 'Global Education',
      },
    ],
  });

  // Seed Success Stories
  await prisma.successStory.createMany({
    data: [
      {
        name: 'Charlie Green',
        score: 350,
        university: 'Stanford',
      },
      {
        name: 'Diana Blue',
        score: 340,
        university: 'Oxford',
      },
    ],
  });

  // Seed Instructors
  await prisma.instructors.createMany({
    data: [
      { name: 'Professor Xavier', role: 'Lecturer', image: 'xavier.png' },
      { name: 'Dr. Strange', role: 'Mentor', image: 'strange.png' },
    ],
  });

  // Seed Admins
  await prisma.admins.createMany({
    data: [
      {
        name: 'Admin User',
        username: 'adminuser',
        email: 'admin@example.com',
        password: 'securepassword', // Ideally hashed
        role: 'superadmin',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seeding complete!');
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
