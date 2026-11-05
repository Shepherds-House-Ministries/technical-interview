import { Router } from 'express';
import { z } from 'zod';
import { Volunteer } from '../models/volunteer.js';

const newVolunteerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.email(),
  shiftDate: z.iso.date(),
});

export const volunteersRouter = Router();

volunteersRouter.get('/', async (_req, res) => {
  const volunteers = await Volunteer.findAll({
    order: [
      ['shiftDate', 'ASC'],
      ['id', 'ASC'],
    ],
  });
  res.json(volunteers);
});

volunteersRouter.post('/', async (req, res) => {
  const result = newVolunteerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: z.flattenError(result.error).fieldErrors });
    return;
  }
  const volunteer = await Volunteer.create(result.data);
  res.status(201).json(volunteer);
});
