import Guild from '../Models/Guild';
import type { Request, Response } from 'express';
import User from '../Models/User';

export async function createGuild(req: Request, res: Response): Promise<void> {
  try {
    const { id, name } = req.body;

    const existing = await Guild.findOne({ id });
    if (existing) throw new Error('Guild with this ID already exists');

    const newGuild = new Guild({ id, name, members: [] });
    const saved = await newGuild.save();
    res.status(201).json(saved);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
}

export async function addToGuild(req: Request, res: Response): Promise<void> {
  try {
    const { guildId, userId } = req.body;

    const guild = await Guild.findOne({ id: guildId });
    const user = await User.findOne({ id: userId });

    if (!guild || !user) throw new Error('Guild or user not found');

    if (!guild.members.includes(userId)) {
      guild.members.push(userId);
      await guild.save();
    }

    res.status(200).json(guild);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
}

export async function removeFromGuild(req: Request, res: Response): Promise<void> {
    try {
      const { guildId, userId } = req.body;
  
      const guild = await Guild.findOne({ id: guildId });
      if (!guild) throw new Error('Guild not found');
  
      guild.members = guild.members.filter((id) => id !== userId);
      await guild.save();
  
      res.status(200).json(guild);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  }

  export async function getGuild(req: Request, res: Response): Promise<void> {
    try {
      const guildId = Number(req.params.id);
  
      const guild = await Guild.findOne({ id: guildId });
      if (!guild) {
        res.status(404).json({ error: 'Guild not found' });
        return;
      }
  
      const members = await User.find({ id: { $in: guild.members } });
  
      res.json({ ...guild.toObject(), members });
    } catch (err) {
      const error = err as Error;
      res.status(500).json({ error: error.message });
    }
  }
