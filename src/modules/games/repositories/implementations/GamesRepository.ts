import { group } from "console";
import { getRepository, Repository, Like } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("game")
      .where("UPPER(game.title) like UPPER(:title)", { title: `%${param}%` })
      .getMany();

    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("select count(*) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const gamesRepositor = this.repository;

    const getSomething = await gamesRepositor.find({
      relations: ["users"],
      where: { id: id },
    });

    console.log(getSomething[0].users);

    return getSomething[0].users;
  }
}
