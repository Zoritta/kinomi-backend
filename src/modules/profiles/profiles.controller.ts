import type { Request, Response, NextFunction } from 'express';
import * as profilesService from './profiles.service';

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await profilesService.getOwnProfile(req.userId);
    res.json({ profile });
  } catch (err) {
    next(err);
  }
}

export async function upsertMe(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await profilesService.upsertOwnProfile(req.userId, req.body);
    res.json({ profile });
  } catch (err) {
    next(err);
  }
}

export async function patchMe(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await profilesService.updateOwnProfile(req.userId, req.body);
    res.json({ profile });
  } catch (err) {
    next(err);
  }
}
