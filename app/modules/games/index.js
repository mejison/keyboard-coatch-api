import Router from 'koa-router';
import { Game } from './models';
import GamesController from './controllers/games-controller';

const router = new Router({ prefix: '/games' });

router
  .get('/', GamesController.getGamesAll)
  .post('/', GamesController.create);

export {
  Game,
};

export default router.routes();
