/**
 * DB/Jobs/ShieldJobTable.js
 *
 * Look up: job id -> shield ressource name
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 */

import WeaponJobTable from './WeaponJobTable.js';
import MountTable from './MountTable.js';

const ShieldJobTable = {};

// Shields are drawn from the same folders as weapons
const keys = Object.keys(WeaponJobTable);
for (let i = 0, count = keys.length; i < count; ++i) {
	ShieldJobTable[keys[i]] = WeaponJobTable[keys[i]];
}

// except on a peco, gryphon, wolf or madogear: those have weapon sprites of
// their own, but the client data has no shield folder for any of them, and the
// rider keeps the shield of the job it mounted from.
const baseKeys = Object.keys(MountTable);
for (let i = 0, count = baseKeys.length; i < count; ++i) {
	const mount = MountTable[baseKeys[i]];
	const base = WeaponJobTable[baseKeys[i]];
	if (mount !== undefined && base !== undefined) {
		ShieldJobTable[mount] = base;
	}
}

// Exports
export default ShieldJobTable;
