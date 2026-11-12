import { describe, expect, it, vi } from 'vitest';

import JobId from 'DB/Jobs/JobConst.js';
import AllMountTable from 'DB/Jobs/AllMountTable.js';

// A garment has a file per class, and a mounted class is its own class:
// the Adventurer's Backpack draws a fox-riding Magician from 여우마법사_여,
// higher up than 마법사_여. The stub names the job the view asked for.
vi.mock('DB/DBManager.js', async () => {
	const DB = {
		getBodyPath: (id, sex) => `body${id}_${sex}`,
		getRobePath: (id, job, sex) => `robe${id}_${job}_${sex}`
	};
	// Anything else the view asks for is not under test.
	return { default: new Proxy(DB, { get: (t, k) => (k in t ? t[k] : () => null) }) };
});
// Answers every load at once, as a cached file does in game.
vi.mock('Core/Client.js', () => ({ default: { loadFile: vi.fn((path, onLoad) => onLoad && onLoad()) } }));
vi.mock('DB/Monsters/ShadowTable.js', () => ({ default: {} }));
vi.mock('Network/PacketVerManager.js', () => ({ default: { value: 20221005 } }));
vi.mock('Renderer/GR2/GR2ModelRenderer.js', () => ({ default: {} }));
vi.mock('Renderer/Entity/EntityAction.js', () => ({ default: vi.fn() }));

const { default: EntityViewInit } = await import('Renderer/Entity/EntityView.js');

const BACKPACK = 2;
const FOX = AllMountTable[JobId.MAGICIAN];

// What updateAllRidingState does when a mount is put on or taken off
function ride(e, costume) {
	e.costume = costume;
	e.job = e._job;
}

function magician(costume) {
	const e = { _job: JobId.MAGICIAN, _sex: 0, _bodypalette: 0, costume, sound: {} };
	EntityViewInit.call(e);
	e.job = e._job;
	e.robe = BACKPACK;
	return e;
}

describe('EntityView garment on a mount', () => {
	it("draws the mount's garment once mounted", () => {
		const e = magician(0);
		ride(e, FOX);
		expect(e.files.robe.spr).toBe(`robe${BACKPACK}_${FOX}_0.spr`);
	});

	it('goes back to the class garment when the mount is taken off', () => {
		const e = magician(FOX);
		expect(e.files.robe.spr).toBe(`robe${BACKPACK}_${FOX}_0.spr`);
		ride(e, 0);
		expect(e.files.robe.spr).toBe(`robe${BACKPACK}_${JobId.MAGICIAN}_0.spr`);
	});

	it('leaves an entity without a garment without one', () => {
		const e = magician(0);
		e.robe = 0;
		e.files.robe.spr = null;
		ride(e, FOX);
		expect(e.files.robe.spr).toBeNull();
	});
});
