// src/modules/successStories/successStory.service.ts
import { PrismaClient, type SuccessStory } from '@prisma/client';
import { HttpNotFoundError, HttpUnprocessableEntityError } from '@/lib/errors';

const prisma = new PrismaClient();

class SuccessStoryService {
  // Create a new success story
  public createSuccessStory = async (data: {
    name: string;
    score: number;
    university: string;
    picture?: string;
  }): Promise<SuccessStory> => {
    if (!data.name || !data.university) {
      throw new HttpUnprocessableEntityError(
        'Name and university are required'
      );
    }
    if (data.score < 0) {
      throw new HttpUnprocessableEntityError('Score must be a positive number');
    }

    const successStory = await prisma.successStory.create({
      data,
    });

    return successStory;
  };

  // Get all success stories
  public getAllSuccessStories = async (): Promise<SuccessStory[]> => {
    return await prisma.successStory.findMany();
  };

  // Get a single success story by ID
  public getSuccessStoryById = async (
    id: number
  ): Promise<SuccessStory | null> => {
    const successStory = await prisma.successStory.findUnique({
      where: { id },
    });

    if (!successStory) {
      throw new HttpNotFoundError(
        'Success story not found for the provided ID'
      );
    }

    return successStory;
  };

  // Update a success story
  public updateSuccessStory = async (
    id: number,
    data: {
      name?: string;
      score?: number;
      university?: string;
      picture?: string;
    }
  ): Promise<SuccessStory> => {
    const successStory = await prisma.successStory.update({
      where: { id },
      data,
    });

    if (!successStory) {
      throw new HttpNotFoundError(
        'Success story not found for the provided ID'
      );
    }

    return successStory;
  };

  // Delete a success story
  public deleteSuccessStory = async (id: number): Promise<SuccessStory> => {
    const successStory = await prisma.successStory.delete({
      where: { id },
    });

    if (!successStory) {
      throw new HttpNotFoundError(
        'Success story not found for the provided ID'
      );
    }

    return successStory;
  };
}

export default SuccessStoryService;
