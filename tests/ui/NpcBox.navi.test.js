/**
 * NPC text links a place as <NAVI>name<INFO>map,x,y</INFO></NAVI>, and
 * Gravity's text often colours the name inside the tag (rAthena's
 * npc/re/jobs/novice/academy.txt). The colour code used to be copied into
 * data-navi-name, where it became a <span style="..."> whose quotes ended
 * the attribute, and the spans it opened ran the link over the rest.
 */
import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
	class MockGUIComponent {
		constructor(name) {
			this.name = name;
			this._host = document.createElement('div');
			this.ui = { show: vi.fn(), hide: vi.fn(), is: vi.fn(() => true) };
		}
		getRoot() {
			return this._host;
		}
		draggable() {}
		focus() {}
	}
	MockGUIComponent.MouseMode = { FREEZE: 0, STOP: 1, CROSS: 2 };
	return { MockGUIComponent };
});

vi.mock('UI/GUIComponent.js', () => ({ default: mocks.MockGUIComponent }));
vi.mock('UI/UIManager.js', () => ({
	default: {
		addComponent(component) {
			component.getRoot().innerHTML = component.render();
			return component;
		}
	}
}));
vi.mock('UI/Elements/Elements.js', () => ({}));
vi.mock('Renderer/Renderer.js', () => ({ default: { width: 800, height: 600 } }));
vi.mock('UI/Components/ItemInfo/ItemInfo.js', () => ({ default: {} }));
vi.mock('UI/Components/Navigation/Navigation.js', () => ({ default: {} }));
vi.mock('UI/Components/NpcMenu/NpcMenu.js', () => ({ default: {} }));
vi.mock('UI/Components/InputBox/InputBox.js', () => ({ default: {} }));

const { default: NpcBox } = await import('UI/Components/NpcBox/NpcBox.js');

function say(text) {
	NpcBox.setText(text, 1);
	return NpcBox.getRoot().querySelector('.content').lastElementChild;
}

describe('NpcBox NAVI links', () => {
	it('links a plain place name', () => {
		const line = say('Talk to <NAVI>Elin<INFO>alberta,117,135,0,100,0,0</INFO></NAVI> in Alberta.');
		const link = line.querySelector('.navi-link');
		expect(link.textContent).toBe('Elin');
		expect(link.dataset.naviInfo).toBe('alberta,117,135,0,100,0,0');
		expect(link.dataset.naviName).toBe('Elin');
	});

	it('keeps the link whole when a colour code is inside its text', () => {
		const line = say('Go see <NAVI>^4D4DFF[Battle Trainer Subino]^000000<INFO>iz_ac01,59,83,</INFO></NAVI> now.');
		const link = line.querySelector('.navi-link');
		expect(link.textContent).toBe('[Battle Trainer Subino]');
		expect(link.dataset.naviName).toBe('[Battle Trainer Subino]');
		expect(link.dataset.naviInfo).toBe('iz_ac01,59,83,');
		expect(link.querySelector('span[style]').style.color).toBe('rgb(77, 77, 255)');
		expect(line.textContent).toBe('Go see [Battle Trainer Subino] now.');
	});
});
