import { Client, Collection, ClientOptions } from 'discord.js';
import { FoxyEvent } from './Event';
import { HelperSettings } from './Settings';
import * as fs from 'fs';

export class Helper extends Client {
    public events: Collection<string, FoxyEvent> = new Collection();
    public settings: HelperSettings;
    constructor(args: ClientOptions = {}, settings: HelperSettings){
        super(args);
        this.settings = settings;
    }
    loadEvents(){
        let eventFiles = fs.readdirSync('./dist/src/events/').filter((file: string) => file.endsWith('.js'));
        eventFiles.forEach(async(file: string) => {
            console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Carregando evento: ${file}...`);
            const eventFile: FoxyEvent = await import(`../events/${file}`);
            this.events.set(eventFile.bind, eventFile);
            this.on(eventFile.bind, eventFile.run.bind(null, this));
        });
        console.info('\x1b[37m\x1b[44mINFO\x1b[0m: Eventos carregados!');
    }
    start(){
        console.info('\x1b[37m\x1b[44mINFO\x1b[0m: Iniciando a Foxy Helper...');
        this.loadEvents();
        super.login(this.settings.token);
    }
}