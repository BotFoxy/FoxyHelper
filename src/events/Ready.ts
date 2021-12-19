import { Run } from '../client/Event';

export const bind: string = 'ready';

export const run: Run = (client) => {
    console.log("\x1b[37m\x1b[44mINFO\x1b[0m: Roxy está online!");
    let status: object[] = [
        { name: `OwO`, type: "WATCHING" },
        { name: `Tirando suas dúvidas 👀`, type: "LISTENING" }
    ];

    setInterval(() => {
        const randomStatus: object = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({ activities: [randomStatus] });
    }, 5000)
}