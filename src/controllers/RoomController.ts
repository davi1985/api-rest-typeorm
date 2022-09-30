import { Request, Response } from "express";
import { Room } from "../entities/Room";
import { Subject } from "../entities/Subject";
import { roomRepository } from "../repositories/roomRepository";
import { subjectRepository } from "../repositories/subjectRepository";
import { videoRepository } from "../repositories/videoRepository";

export class RoomController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      const newRoom = roomRepository.create({
        name,
        description,
      });

      await roomRepository.save(newRoom);

      return response.status(201).json(newRoom);
    } catch (error) {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async videoCreate(request: Request, response: Response) {
    const { title, url } = request.body;
    const { room_id } = request.params;

    try {
      const room = await this.hasRoom(room_id);

      if (!room) {
        return response.status(404).json({ message: "Lesson not found" });
      }

      const newVideo = videoRepository.create({
        title,
        url,
        room,
      });

      await videoRepository.save(newVideo);

      return response.status(201).json(newVideo);
    } catch {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  async subjectRoom(request: Request, response: Response) {
    const { subject_id } = request.body;
    const { room_id } = request.params;

    try {
      const room = await this.hasRoom(room_id);
      const subject = await this.hasSubject(subject_id);

      if (!room) {
        return response.status(404).json({ message: "Lesson not found" });
      }

      if (!subject) {
        return response.status(404).json({ message: "Subject not found" });
      }

      const roomUpdate = {
        ...room,
        subjects: [subject],
      };

      await roomRepository.save(roomUpdate);

      return response.status(200).json(room);
    } catch {
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  private async hasRoom(id: string | number): Promise<Room | null> {
    return roomRepository.findOneBy({ id: Number(id) });
  }

  private async hasSubject(id: string | number): Promise<Subject | null> {
    return subjectRepository.findOneBy({ id: Number(id) });
  }
}
