import { Player } from '../models';

export default {
  async createPlayer(data) {
    try {
      return await Player.create(data);
    } catch (e) {
      throw new AppError({ status: 400, ...e });
    }
  },
};
