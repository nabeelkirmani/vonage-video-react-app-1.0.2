import { NextFunction, Request, Response, Router } from 'express';
import createVideoService from '../videoService/videoServiceFactory';
import getSessionStorageService from '../sessionStorageService';
import createGetOrCreateSession from './getOrCreateSession';

const sessionRouter = Router();
const videoService = createVideoService();
const sessionService = getSessionStorageService();
const getOrCreateSession = createGetOrCreateSession({
  videoService,
  sessionService,
});

sessionRouter.get(
  '/:room',
  async (req: Request<{ room: string }>, res: Response, next: NextFunction) => {
    try {
      const { room: roomName } = req.params;
      if (!roomName || roomName.trim() === '') {
        res.status(400).send({ message: 'Room name cannot be empty.' });
        return;
      }
      const sessionId = await getOrCreateSession(roomName);
      const data = videoService.generateToken(sessionId);
      res.json({
        sessionId,
        token: data.token,
        apiKey: data.apiKey,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
);

sessionRouter.post(
  '/:room/startArchive',
  async (req: Request<{ room: string }>, res: Response, next: NextFunction) => {
    try {
      const { room: roomName } = req.params;
      if (!roomName || roomName.trim() === '') {
        res.status(400).send({ message: 'Room name cannot be empty.' });
        return;
      }
      const sessionId = await sessionService.getSession(roomName);
      if (sessionId) {
        const archive = await videoService.startArchive(roomName, sessionId);
        res.json({
          archiveId: archive.id,
        });
      } else {
        res.status(404).json({ message: 'Room not found' });
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

sessionRouter.post(
  '/:room/:archiveId/stopArchive',
  async (req: Request<{ room: string; archiveId: string }>, res: Response, next: NextFunction) => {
    try {
      const { archiveId } = req.params;
      if (archiveId) {
        const responseArchiveId = await videoService.stopArchive(archiveId);
        res.json({
          archiveId: responseArchiveId,
        });
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

sessionRouter.get(
  '/:room/archives',
  async (req: Request<{ room: string }>, res: Response, next: NextFunction) => {
    try {
      const { room: roomName } = req.params;
      if (!roomName || roomName.trim() === '') {
        res.status(400).send({ message: 'Room name cannot be empty.' });
        return;
      }
      const sessionId = await sessionService.getSession(roomName);
      if (sessionId) {
        const archives = await videoService.listArchives(sessionId);
        res.json({
          archives,
        });
      } else {
        res.status(404).json({ message: 'Room not found' });
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

export default sessionRouter;
