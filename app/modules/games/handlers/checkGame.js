import { Game } from '../models';

export default () => async (hash, ctx, next) => {
  const game = await Game.findOne({ hash });
  
  if ( ! game) {
    ctx.throw(404, `Game with link "${hash}" not found`);
  }

  ctx.state.game = game;
  await next();
};
