import Router from 'koa-router';
import auth from './auth';
import summaries from './summaries';
import users from './users';
import games from './games';
import player from './player';

const router = new Router({ prefix: '/api' });

router.use(auth);
router.use(summaries);
router.use(users);
router.use(games);
router.use(player);

export default router.routes();
