// src/modules/successStories/successStories.controller.ts
import { type Request, type Response, type NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import SuccessStoryService from './successStory.service';
import Api from '@/lib/api';

class SuccessStoryController extends Api {
  private readonly successStoryService = new SuccessStoryService();

  // Create a success story
  public createSuccessStory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, score, university, picture } = req.body;
      const successStory = await this.successStoryService.createSuccessStory({
        name,
        score,
        university,
        picture, // Optional picture
      });
      res.status(201).json(successStory);
    } catch (error) {
      next(error);
    }
  };

  // Get all success stories
  public getAllSuccessStories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const successStories =
        await this.successStoryService.getAllSuccessStories();
      res.status(200).json(successStories);
    } catch (error) {
      next(error);
    }
  };

  // Get a single success story by ID
  public getSuccessStoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const successStory = await this.successStoryService.getSuccessStoryById(
        parseInt(id)
      );
      if (!successStory) {
        return res.status(404).json({ message: 'Success story not found' });
      }
      res.status(200).json(successStory);
    } catch (error) {
      next(error);
    }
  };

  // Update a success story
  public updateSuccessStory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { name, score, university, picture } = req.body;
      const successStory = await this.successStoryService.updateSuccessStory(
        parseInt(id),
        { name, score, university, picture } // Include optional picture
      );
      this.send(
        res,
        successStory,
        HttpStatusCode.Ok,
        'Success story updated successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  // Delete a success story
  public deleteSuccessStory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const successStory = await this.successStoryService.deleteSuccessStory(
        parseInt(id)
      );
      this.send(
        res,
        successStory,
        HttpStatusCode.Ok,
        'Success story deleted successfully'
      );
    } catch (error) {
      next(error);
    }
  };
}

export default new SuccessStoryController();
