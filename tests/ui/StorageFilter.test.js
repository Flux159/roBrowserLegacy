import { describe, expect, it, vi } from 'vitest';

// A class, exactly as the real GUIComponent is. That matters: the bug this
// covers is that a class constructor cannot be invoked with .call(), so a
// plain-object stand-in would not reproduce it.
const mocks = vi.hoisted(() => {
	class MockGUIComponent {
		constructor(name, cssText) {
			this.name = name;
			this._cssText = cssText;
			this._host = document.createElement('div');
		}

		getRoot() {
			return this._host;
		}
	}
	MockGUIComponent.MouseMode = { STOP: 2 };

	return { MockGUIComponent };
});

vi.mock('DB/DBManager.js', () => ({
	default: { INTERFACE_PATH: 'data/texture/', getItemInfo: () => ({}), getItemName: () => '' }
}));
vi.mock('Core/Client.js', () => ({ default: { loadFile(_path, callback) { callback?.(''); } } }));
vi.mock('Core/Preferences.js', () => ({
	default: { get: () => ({ x: 0, y: 0, height: 4, save: vi.fn() }) }
}));
vi.mock('Renderer/Renderer.js', () => ({ default: { width: 1200, height: 800 } }));
vi.mock('Controls/MouseEventHandler.js', () => ({ default: { screen: { x: 0, y: 0 } } }));
vi.mock('UI/GUIComponent.js', () => ({ default: mocks.MockGUIComponent }));
vi.mock('UI/Elements/Elements.js', () => ({}));
vi.mock('UI/Components/ItemInfo/ItemInfo.js', () => ({ default: {} }));

const { default: StorageFilter } = await import('UI/Components/Storage/StorageV3/StorageFilter.js');

describe('StorageFilter', () => {
	it('can be constructed', () => {
		expect(() => new StorageFilter(0)).not.toThrow();
	});

	it('is a GUIComponent and takes its name from the tab', () => {
		const filter = new StorageFilter(3);

		expect(filter).toBeInstanceOf(mocks.MockGUIComponent);
		expect(filter.name).toBe('StorageFilter_3');
	});

	it('still carries the methods defined on its prototype', () => {
		const filter = new StorageFilter(0);

		expect(typeof filter.init).toBe('function');
		expect(typeof filter.setItems).toBe('function');
		expect(typeof filter.addItem).toBe('function');
		expect(filter.mouseMode).toBe(mocks.MockGUIComponent.MouseMode.STOP);
	});
});