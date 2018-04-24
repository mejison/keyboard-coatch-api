import Router from 'koa-router';
import { Player } from './models';
import PlayerController from './controllers/player-controller';

const router = new Router({ prefix: '/player' });

router
  .post('/', PlayerController.create);

export {
  Player,
};

export default router.routes();
