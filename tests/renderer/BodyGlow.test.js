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

	it('ends at its end tick, if it has one', () => {
		const glow = new BodyGlow(current, 1000);
		glow.render(null, 999);
		expect(glow.needCleanUp).toBeUndefined();
		glow.render(null, 1000);
		expect(glow.needCleanUp).toBe(true);
		glow.free();
		expect(current._additiveBody).toBe(0);
	});
});

describe('BodyEffects', () => {
	it('draws EF_WHITEBODY (1065) and 1131 as a body that adds light', () => {
		for (const id of [1065, 1131]) {
			const added = [];
			const owner = { GID: 1 };
			BodyEffects[id].forEach(part =>
				part.func.call(
					{ add: e => added.push(e) },
					{ Init: { ownerEntity: owner }, Inst: { persistent: true, startTick: 0 } }
				)
			);
			expect(added, `effect ${id}`).toHaveLength(1);
			expect(added[0]).toBeInstanceOf(BodyGlow);
			expect(owner._additiveBody).toBe(1);
		}
	});

	it('lasts until removed as a hat effect, and 9999 client frames as a one-shot', () => {
		const spawn = persistent => {
			const added = [];
			BodyEffects[1065][0].func.call(
				{ add: e => added.push(e) },
				{ Init: { ownerEntity: current }, Inst: { persistent, startTick: 500 } }
			);
			return added[0];
		};

		const hat = spawn(true);
		hat.render(null, 1e9);
		expect(hat.needCleanUp).toBeUndefined();

		const once = spawn(false);
		once.render(null, 500 + 9999 * 25 - 1);
		expect(once.needCleanUp).toBeUndefined();
		once.render(null, 500 + 9999 * 25);
		expect(once.needCleanUp).toBe(true);
	});
});
