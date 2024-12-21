import { type User } from '@prisma/client';
import prisma from '@/lib/prisma';
import LogMessage from '@/decorators/log-message.decorator';

export default class UserService {
  @LogMessage<[User]>({ message: 'test-decorator' })
  public async createUser(data: any): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  public async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  public async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
}
