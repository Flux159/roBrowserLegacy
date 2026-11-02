import { beforeEach, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({ chat: [], dialog: [] }));

vi.mock('UI/GUIComponent.js', () => ({
	default: class {
		getRoot() {
			return null;
		}
	}
}));
vi.mock('UI/UIManager.js', () => ({ default: { addComponent: component => component } }));
vi.mock('UI/Elements/Elements.js', () => ({}));
vi.mock('Core/Preferences.js', () => ({ default: { get: (_name, defaults) => ({ ...defaults, save() {} }) } }));
vi.mock('Core/Client.js', () => ({ default: { loadFile() {} } }));
vi.mock('Renderer/Renderer.js', () => ({ default: {} }));
vi.mock('Network/NetworkManager.js', () => ({ default: { sendPacket() {}, hookPacket() {} } }));
vi.mock('Network/PacketStructure.js', () => ({ default: { CZ: {}, ZC: {} } }));
vi.mock('DB/DBManager.js', () => ({ default: { getQuestInfo: () => ({ Title: 'The Sphinx' }) } }));
vi.mock('UI/Components/ChatBox/ChatBox.js', () => ({
	default: { addText: text => state.chat.push(text), TYPE: { ADMIN: 1, SELF: 2 }, FILTER: { QUEST: 4 } }
}));
vi.mock('Engine/SessionStorage.js', () => ({
	default: { Entity: { dialog: { set: text => state.dialog.push(text) } } }
}));

const { createQuest } = await import('UI/Components/Quest/QuestCommon.js');
const Quest = createQuest({ name: 'QuestTest', htmlText: '', cssText: '', questHelper: { prepare() {} } });

// A quest with two objectives, the second already finished.
beforeEach(() => {
	state.chat = [];
	state.dialog = [];
	Quest.setQuestList({
		1001: {
			questID: 1001,
			hunt_list: {
				1001000: { mobName: 'Zenorc', huntCount: 3, maxCount: 20 },
				1001001: { mobName: 'Drainliar', huntCount: 10, maxCount: 10 }
			}
		}
	});
});

// rAthena sends every objective on each kill (clif_quest_update_objective).
const kill = counts =>
	counts.forEach((huntCount, i) =>
		Quest.updateMissionHunt({ huntID: 1001000 + i, maxCount: [20, 10][i], huntCount }, 1001, 1001000 + i)
	);

it('announces only the objective whose count moved', () => {
	kill([4, 10]);
	expect(state.dialog).toEqual(['Zenorc [4/20]']);
	expect(state.chat).toEqual(['Mission [The Sphinx], you killed [Zenorc]. (4/20)']);
});

it('still says Completed when the killed monster finishes its objective', () => {
	kill([20, 10]);
	expect(state.dialog).toEqual(['Zenorc [Completed]']);
});
