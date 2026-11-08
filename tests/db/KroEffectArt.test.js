import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Effect art that a plain kRO data.grf does not carry at the path the table
// asks for. The entries must either point at where kRO keeps the art or
// declare a fallback to art kRO has, so the kRO-only setup renders them
// instead of silently skipping.
const effectTable = readFileSync(join(process.cwd(), 'src/DB/Effects/EffectTable.js'), 'utf8').replace(/\r\n/g, '\n');

function block(key) {
	const start = effectTable.indexOf(`\n\t${key}: [`);
	const end = effectTable.indexOf('\n\t],', start);
	expect(start).toBeGreaterThan(-1);
	return effectTable.slice(start, end);
}

describe('effect art resolvable with a plain kRO data.grf', () => {
	it('EF_GLASSWALL points at the safetywall str that exists in kRO', () => {
		const effect = block('13');
		expect(effect).toMatch(/type: 'STR'/);
		expect(effect).toMatch(/file: 'safetywall'/);
		expect(effect).not.toMatch(/effect\/safetywall/);
	});

	it('EF_ITEM316 falls back to mobile_ef02, which kRO ships', () => {
		const effect = block('705');
		expect(effect).toMatch(/file: 'mobile_ef01'/);
		expect(effect).toMatch(/fallback: \['mobile_ef02'\]/);
	});
});
