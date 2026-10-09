import { describe, it, expect, vi, beforeEach } from 'vitest';

let current;
vi.mock('Renderer/EntityManager.js', () => ({ default: { get: () => current } }));

import BodyGlow from 'Renderer/Effects/BodyGlow.js';
import BodyEffects from 'DB/Effects/BodyEffects.js';

beforeEach(() => {
	current = { GID: 1 };
});

describe('BodyGlow', () => {
	it('marks its owner while it lasts, counting two effects on one body', () => {
		const a = new BodyGlow(current);
		const b = new BodyGlow(current);
		expect(a.ready).toBe(true);
		expect(current._additiveBody).toBe(2);
		a.free();
		expect(current._additiveBody).toBe(1);
		a.free(); // freed twice: counted once
		expect(current._additiveBody).toBe(1);
		b.free();
		expect(current._additiveBody).toBe(0);
	});

	it('ends when its owner is gone', () => {
		const glow = new BodyGlow(current);
		glow.render();
		expect(glow.needCleanUp).toBeUndefined();
		current = { GID: 2 };
		glow.render();
		expect(glow.needCleanUp).toBe(true);
	});
});

describe('BodyEffects', () => {
	it('draws EF_WHITEBODY (1065) and 1131 as a body that adds light', () => {
		for (const id of [1065, 1131]) {
			const added = [];
			const owner = { GID: 1 };
			BodyEffects[id].forEach(part => part.func.call({ add: e => added.push(e) }, { Init: { ownerEntity: owner } }));
			expect(added, `effect ${id}`).toHaveLength(1);
			expect(added[0]).toBeInstanceOf(BodyGlow);
			expect(owner._additiveBody).toBe(1);
		}
	});
});
