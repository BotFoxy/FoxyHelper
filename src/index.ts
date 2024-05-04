import { createBot, Intents, startBot } from 'discordeno';
import { setupFoxy, setupInternals } from './structures/client/FoxyClient';
import { FoxyClient } from './structures/types/foxy';
import { logger } from './utils/logger';
import { enableCachePlugin } from 'discordeno/cache-plugin'
import { setupEventsHandler } from './listeners';
import config from '../config.json';

const bot = createBot({
    token: config.token,
    intents: 37379 as Intents,
    botId: BigInt(config.clientId),
}) as FoxyClient;

enableCachePlugin(bot);
setupFoxy(bot);
setupInternals(bot);
setupEventsHandler();
startBot(bot);

export { bot };

process.on('unhandledRejection', (err: Error) => {
    return logger.error(err);
});

process.on('uncaughtException', (err) => {
    logger.criticalError(err.stack);
});