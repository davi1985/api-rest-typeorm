import { Router } from "express";
import { RoomController } from "./controllers/RoomController";
import { SubjectController } from "./controllers/SubjectController";

const routes = Router();

routes.post("/subject", new SubjectController().create);
routes.post("/room", new RoomController().create);
routes.post("/room/:room_id/create", new RoomController().videoCreate);
routes.post("/room/:room_id/subject", new RoomController().subjectRoom);

export { routes };
