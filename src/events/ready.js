module.exports = async(client) => {
    console.info("Logged!")

    const status = [
        { name: `Com ${client.users.cache.size} Membros no meu servidor de suporte!`, type: "WATCHING"},
        { name: `Tirando suas dúvidas 👀`, type: "LISTENING"}
    ];

    setInterval(() => {
        const randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({ activity: randomStatus});
    }, 5000)
}