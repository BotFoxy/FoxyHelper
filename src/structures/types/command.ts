import { CreateSlashApplicationCommand } from 'discordeno';
import ComponentInteractionContext from '../../command/structures/ComponentInteractionContext';
import ChatInputInteractionContext from '../../command/structures/ChatInputInteractionContext';

type CommandCategory = 'economy' | 'roleplay' | 'fun' | 'actions' | 'social' | 'util' | 'games' | 'image' | 'dev' | 'mod';

export interface ChatInputCommandConfig extends CreateSlashApplicationCommand {
  devsOnly?: true;
  category: CommandCategory;
}

export interface ChatInputInteractionCommand extends Readonly<ChatInputCommandConfig> {
  readonly execute: (
    context: ChatInputInteractionContext,
    endCommand: (...args: unknown[]) => unknown
  ) => Promise<unknown>;

  readonly commandRelatedExecutions?: ((
    context: ComponentInteractionContext<any>,
  ) => Promise<unknown>)[];
}