import { Player } from '../models';
import { PlayerService } from '../services';
import pick from 'lodash/pick';

export default {
    async create(ctx) {
        const data = {
          ...pick(ctx.request.body, Player.createFields)
        };
    
        const { _id } = await PlayerService.createPlayer(data);
        const player = await Player.findOne({ _id });
    
        ctx.status = 201;
        ctx.body = { data: player };
      },
};
