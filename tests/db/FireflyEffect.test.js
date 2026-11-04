import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// EF_FIREFLY used to be an empty FUNC entry. EffectManager therefore accepted
// the server command but skipped it because there was no function to invoke.
const effectTable = readFileSync(join(process.cwd(), 'src/DB/Effects/EffectTable.js'), 'utf8').replace(/\r\n/g, '\n');

describe('EF_FIREFLY', () => {
	it('draws faint moving particles spread around the target', () => {
		const start = effectTable.indexOf('\n\t45: [');
		const end = effectTable.indexOf('\n\t],', start);
		const effect = effectTable.slice(start, end);

		expect(start).toBeGreaterThan(-1);
		expect(effect).toMatch(/type: '3D'/);
		expect(effect).toMatch(/file: 'effect\/pok3\.tga'/);
		expect(effect).toMatch(/attachedEntity: true/);
		expect(effect).toMatch(/duplicate: 48/);
		expect(effect).toMatch(/posxStartRand: 12/);
		expect(effect).toMatch(/posyStartRand: 12/);
		expect(effect).toMatch(/fadeIn: true/);
		expect(effect).toMatch(/fadeOut: true/);
		expect(effect).not.toMatch(/type: 'FUNC'/);
	});
});
