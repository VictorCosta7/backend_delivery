import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const clientExists = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!clientExists) {
      throw new Error("Username or password invalid!");
    }

    const passwordMatch = await compare(password, clientExists.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = sign({ username }, "3f00ca522e10ba50e34747b98349bead", {
      subject: clientExists.id,
      expiresIn: "1d",
    });

    return token;
  }
}
