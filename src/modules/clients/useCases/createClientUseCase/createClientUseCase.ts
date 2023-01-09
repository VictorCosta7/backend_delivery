import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string;
  password: string;
}

class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    const clientExists = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (clientExists) {
      throw new Error("Client alredy exists!");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}

export { CreateClientUseCase };
