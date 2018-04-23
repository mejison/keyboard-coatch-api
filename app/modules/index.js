import Router from 'koa-router';
import auth from './auth';
import summaries from './summaries';
import users from './users';
import games from './games';

const router = new Router({ prefix: '/api' });

router.use(auth);
router.use(summaries);
router.use(users);
router.use(games);

export default router.routes();
