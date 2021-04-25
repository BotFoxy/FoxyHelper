import { Run } from '../client/Event';
import * as faq from '../../faq.json';

export const bind: string = 'message';

export const run: Run = (client, message) => {
    if(faq[message.content]){
        message.FoxyReply(faq[message.content]);
    }
}