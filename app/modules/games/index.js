import Router from 'koa-router';
import { Game } from './models';
import GamesController from './controllers/games-controller';
import checkGame from './handlers/checkGame';

const router = new Router({ prefix: '/games' });

router
  .get('/', GamesController.getGamesAll)
  .param('hash', checkGame())
  .get('/:hash', GamesController.getGame)
  .post('/:hash/player', GamesController.addPlayer)
  .post('/', GamesController.create);

export {
  Game,
};

export default router.routes();
