import { Router } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClientUseCase/createClientController";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";

const clientRoutes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

clientRoutes.post("/client/", createClientController.handle);

clientRoutes.post("/authenticate/", authenticateClientController.handle);

export { clientRoutes };
