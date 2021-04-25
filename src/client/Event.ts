import { Helper } from './HelperClient';

export interface Run {
    (client: Helper, ...args: any[]): any;
}

export interface FoxyEvent {
    bind: string;
    run: Run;
}