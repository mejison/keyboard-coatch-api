import { Game } from '../models';
import { GameService } from '../services';
import pick from 'lodash/pick';

export default {
    async getGamesAll(ctx) {
        const games = await Game.find({}, (err, games) => games );
        ctx.body = { data : games };
    },
    async create(ctx) {
        const gameData = {
          ...pick(ctx.request.body, Game.createFields)
        };
    
        const { _id } = await GameService.createGame(gameData);
        const game = await Game.findOne({ _id });
    
        ctx.status = 201;
        ctx.body = { data: game };
      },
};
