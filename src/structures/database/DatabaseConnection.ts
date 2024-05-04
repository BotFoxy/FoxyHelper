import mongoose from 'mongoose';
import { logger } from '../../utils/logger';
import { mongouri } from '../../../config.json';
import { bot } from '../../index';
import { User } from 'discordeno/transformers';
import { FoxyClient } from '../types/foxy';

export default class DatabaseConnection {
    public client: FoxyClient;
    public key: any;
    public user: any;
    public commands: any;
    public guilds: any;
    public riotAccount: any;

    constructor(client) {
        mongoose.set("strictQuery", true)
        mongoose.connect(mongouri).catch((error) => {
            logger.error(`Failed to connect to database: `, error);
        });
        logger.info(`[DATABASE] Connected to database!`);

        const keySchema = new mongoose.Schema({
            key: String,
            used: Boolean,
            expiresAt: Date,
            pType: Number,
            guild: String,
        }, { versionKey: false, id: false });
        const transactionSchema = new mongoose.Schema({
            to: String,
            from: String,
            quantity: Number,
            date: Date,
            received: Boolean,
            type: String
        }, {
            versionKey: false, id: false
        });
        const petSchema = new mongoose.Schema({
            name: String,
            type: String,
            rarity: String,
            level: Number,
            hungry: Number,
            happy: Number,
            health: Number,
            lastHungry: Date,
            lastHappy: Date,
            isDead: Boolean,
            isClean: Boolean,
            food: Array
        }, { versionKey: false, id: false });
        const keySchemaForGuilds = new mongoose.Schema({
            key: String,
            used: Boolean,
            expiresAt: Date,
            pType: Number,
            guild: String,
            owner: String,
        }, {
            versionKey: false, id: false
        });
        const userSchema = new mongoose.Schema({
            _id: String,
            userCreationTimestamp: Date,
            isBanned: Boolean,
            banDate: Date,
            banReason: String,
            userCakes: {
                balance: Number,
                lastDaily: Date,
            },
            marryStatus: {
                marriedWith: String,
                marriedDate: Date,
                cantMarry: Boolean,
            },
            userProfile: {
                decoration: String,
                decorationList: Array,
                background: String,
                backgroundList: Array,
                repCount: Number,
                lastRep: Date,
                layout: String,
                aboutme: String,
            },
            userPremium: {
                premium: Boolean,
                premiumDate: Date,
                premiumType: String,
            },
            userSettings: {
                language: String
            },
            petInfo: petSchema,
            userTransactions: [transactionSchema],
            riotAccount: {
                isLinked: Boolean,
                puuid: String,
                isPrivate: Boolean,
                region: String
            },
            premiumKeys: [keySchema]
        }, { versionKey: false, id: false });

        const commandsSchema = new mongoose.Schema({
            commandName: String,
            commandUsageCount: Number,
            description: String,
            isInactive: Boolean,
            subcommands: Array,
            usage: Array
        }, { versionKey: false, id: false });

        const guildSchema = new mongoose.Schema({
            _id: String,
            GuildJoinLeaveModule: {
                isEnabled: Boolean,
                joinMessage: String,
                alertWhenUserLeaves: Boolean,
                leaveMessage: String,
                joinChannel: String,
                leaveChannel: String,
            },
            valAutoRoleModule: {
                isEnabled: Boolean,
                unratedRole: String,
                ironRole: String,
                bronzeRole: String,
                silverRole: String,
                goldRole: String,
                platinumRole: String,
                diamondRole: String,
                ascendantRole: String,
                immortalRole: String,
                radiantRole: String,
            },
            premiumKeys: [keySchemaForGuilds]
        }, { versionKey: false, id: false });
        const riotAccountSchema = new mongoose.Schema({
            puuid: String,
            authCode: String,
        });

        this.user = mongoose.model('user', userSchema);
        this.commands = mongoose.model('commands', commandsSchema);
        this.guilds = mongoose.model('guilds', guildSchema);
        this.key = mongoose.model('key', keySchema);
        this.riotAccount = mongoose.model('riotAccount', riotAccountSchema);
        this.client = client;
    }

    async getUser(userId: BigInt): Promise<any> {
        if (!userId) null;
        const user: User = await bot.helpers.getUser(String(userId));
        let document = await this.user.findOne({ _id: user.id });

        if (!document) {
            document = new this.user({
                _id: user.id,
                userCreationTimestamp: new Date(),
                isBanned: false,
                banDate: null,
                banReason: null,
                userCakes: {
                    balance: 0,
                    lastDaily: null,
                },
                marryStatus: {
                    marriedWith: null,
                    marriedDate: null,
                    cantMarry: false,
                },
                userProfile: {
                    decoration: null,
                    decorationList: [],
                    background: "default",
                    backgroundList: ["default"],
                    repCount: 0,
                    lastRep: null,
                    layout: "default",
                    aboutme: null,
                },
                userPremium: {
                    premium: false,
                    premiumDate: null,
                    premiumType: null,
                },
                userSettings: {
                    language: 'pt-br'
                },
                petInfo: {
                    name: null,
                    type: null,
                    rarity: null,
                    level: 0,
                    hungry: 100,
                    happy: 100,
                    health: 100,
                    lastHungry: null,
                    lastHappy: null,
                    isDead: false,
                    isClean: true,
                    food: []
                },
                userTransactions: [],
                riotAccount: {
                    isLinked: false,
                    puuid: null,
                    isPrivate: false,
                    region: null
                },
                premiumKeys: []
            }).save();
        }

        return document;
    }

    async getAllUsers(): Promise<void> {
        let usersData = await this.user.find({});
        return usersData.map(user => user.toJSON());
    }

    async getAllGuilds(): Promise<void> {
        let guildsData = await this.guilds.find({});
        return guildsData.length;
    }
}