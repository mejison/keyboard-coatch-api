import { Game } from '../models';

export default {
  async createGame(data) {
    try {
      return await Game.create(data);
    } catch (e) {
      throw new AppError({ status: 400, ...e });
    }
  },
};
