/**
 * The item description window is one window reused from item to item. Its
 * picture (collection/<resource name>.bmp) used to be set only when that file
 * loaded, so an item whose picture the client's data lacks -- or whose answer
 * arrived after another item was opened -- showed the previous item's picture.
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
	return { MockGUIComponent, pending: [], missing: new Set() };
});

const items = {
	1: { identifiedResourceName: 'apple', identifiedDescriptionName: [] },
	2: { identifiedResourceName: 'c_dimensional_sword', identifiedDescriptionName: [] }
};

// Anything else the window asks the DB for answers empty.
vi.mock('DB/DBManager.js', () => ({
	default: new Proxy(
		{ INTERFACE_PATH: '', getItemInfo: id => items[id], isPetEgg: () => false, formatMsgToHtml: s => s },
		{ get: (target, key) => (key in target ? target[key] : () => '') }
	)
}));
// Images answer later, in the order a test releases them
vi.mock('Core/Client.js', () => ({
	default: {
		loadFile(path, onload, onerror) {
			mocks.pending.push(() => (mocks.missing.has(path) ? onerror?.("Can't get file") : onload?.(`img:${path}`)));
		}
	}
}));
vi.mock('UI/GUIComponent.js', () => ({ default: mocks.MockGUIComponent }));
vi.mock('UI/UIManager.js', () => ({
	default: {
		addComponent(component) {
			component.getRoot().innerHTML = component.render();
			return component;
		}
	}
}));
vi.mock('Network/NetworkManager.js', () => ({ default: { sendPacket: vi.fn(), hookPacket: vi.fn() } }));
vi.mock('Network/PacketStructure.js', () => ({ default: { CZ: {}, ZC: {} } }));
vi.mock('UI/Components/CardIllustration/CardIllustration.js', () => ({ default: {} }));
vi.mock('UI/Components/ItemCompare/ItemCompare.js', () => ({ default: {} }));
vi.mock('UI/Components/ItemPreview/ItemPreview.js', () => ({ default: {} }));
vi.mock('UI/Components/MakeReadBook/MakeReadBook.js', () => ({ default: {} }));
vi.mock('UI/Components/Equipment/Equipment.js', () => ({ default: {} }));
vi.mock('UI/Components/Inventory/Inventory.js', () => ({ default: {} }));
vi.mock('Renderer/Renderer.js', () => ({ default: { render: vi.fn(), stop: vi.fn() } }));
vi.mock('Renderer/SpriteRenderer.js', () => ({ default: {} }));
vi.mock('Renderer/Entity/Entity.js', () => ({ default: function Entity() {} }));
vi.mock('Loaders/Sprite.js', () => ({ default: {} }));
vi.mock('Loaders/Action.js', () => ({ default: {} }));
vi.mock('UI/CursorManager.js', () => ({ default: { ACTION: {}, setType: vi.fn() } }));
vi.mock('UI/Elements/Elements.js', () => ({}));

const { default: ItemInfo } = await import('UI/Components/ItemInfo/ItemInfo.js');

const picture = () => ItemInfo.getRoot().querySelector('.collection').style.backgroundImage;
const show = ITID => ItemInfo.setItem({ ITID, IsIdentified: true, type: 4 });
function answerAll() {
	while (mocks.pending.length) mocks.pending.shift()();
}

describe('the item description picture', () => {
	it("is not the previous item's when this item has none", () => {
		mocks.missing = new Set(['collection/c_dimensional_sword.bmp']);
		show(1);
		answerAll();
		expect(picture()).toContain('collection/apple.bmp');

		show(2);
		answerAll();
		expect(picture()).toBe('');
	});

	it('is the last opened item, whichever answer comes first', () => {
		mocks.missing = new Set();
		show(1);
		show(2);
		// The second item's picture first, then the first item's, late.
		mocks.pending.reverse();
		answerAll();
		expect(picture()).toContain('collection/c_dimensional_sword.bmp');
	});
});
