import { Run } from '../client/Event';

export const bind: string = 'ready';

export const run: Run = (client) => {
    console.log("\x1b[37m\x1b[44mINFO\x1b[0m: Foxy Helper está online!");
    let status: object[] = [
        { name: `Com ${client.users.cache.size} Membros no meu servidor de suporte!`, type: "WATCHING"},
        { name: `Tirando suas dúvidas 👀`, type: "LISTENING"}
    ];

    setInterval(() => {
        const randomStatus: object = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({activity:randomStatus});
    }, 5000)
}