import { describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
	if (typeof globalThis.localStorage === 'undefined' || typeof globalThis.localStorage.getItem !== 'function') {
		const store = {};
		globalThis.localStorage = {
			getItem: key => (key in store ? store[key] : null),
			setItem: (key, val) => {
				store[key] = String(val);
			},
			removeItem: key => {
				delete store[key];
			}
		};
	}
});

import DB from 'DB/DBManager.js';
import JobId from 'DB/Jobs/JobConst.js';
import WeaponTable from 'DB/Items/WeaponTable.js';
import WeaponType from 'DB/Items/WeaponType.js';

// A weapon's look id comes from the item's ClassNum; weapontable.lub names it
// (WeaponNameTable) and gives its base type (Expansion_Weapon_IDs). The official
// looks are all below WeaponType.MAX. A mod's own look needs a higher id, and
// used to be turned into its base type, so the mod's sprite was never loaded.
describe('DB.getWeaponPath', () => {
	it('draws a stock weapon type under its own name', () => {
		expect(DB.getWeaponPath(WeaponType.SHORTSWORD, JobId.THIEF, 1)).toMatch(/_\xb4\xdc\xb0\xcb$/);
	});

	it('draws a look a mod named, at or above WeaponType.MAX, under that name', () => {
		const look = WeaponType.MAX + 4900;
		WeaponTable[look] = '_crimson';
		try {
			expect(DB.getWeaponPath(look, JobId.THIEF, 1)).toMatch(/_crimson$/);
		} finally {
			delete WeaponTable[look];
		}
	});

	it('still reduces an unnamed id above MAX to its weapon type', () => {
		// 1201 is in the dagger range, and nothing named it.
		expect(DB.getWeaponPath(1201, JobId.THIEF, 1)).toMatch(/_\xb4\xdc\xb0\xcb$/);
	});
	it('draws a doram weapon from the doram folder, where the client keeps it', () => {
		const path = DB.getWeaponPath(WeaponType.ROD, JobId.DO_SUMMONER, 0);
		expect(path.startsWith('data/sprite/\xb5\xb5\xb6\xf7\xc1\xb7/')).toBe(true);
		expect(DB.getWeaponPath(WeaponType.ROD, JobId.SPIRIT_HANDLER, 1).startsWith('data/sprite/\xb5\xb5\xb6\xf7\xc1\xb7/')).toBe(true);
	});

	it('keeps every other class in the human folder', () => {
		expect(DB.getWeaponPath(WeaponType.ROD, JobId.MAGICIAN, 0).startsWith('data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/')).toBe(true);
	});
});
