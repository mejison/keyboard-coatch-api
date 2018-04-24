import { Game } from '../models';
import { PlayerService } from '../../player/services';
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
    async getGame(ctx) {
        const { state: { game } } = ctx;
        
        const hash = game.hash;
        const data = await Game.
            findOne({ hash })
                .populate('players')
                .exec();

        ctx.status = 200;
        ctx.body = { data : pick(data, Game.createFields) };
    },
    async addPlayer(ctx) {
        const { state: { game } } = ctx;
        const player = await PlayerService.createPlayer({name : 'New Player'});

        game.players.push(player);
        game.save();

        ctx.status = 201;
        ctx.body = { data: player };
    }
};
