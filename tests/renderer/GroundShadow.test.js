import { beforeAll, describe, expect, it, vi } from 'vitest';

// Anything WebGL or canvas: Ground.init() uploads textures we never look at.
const stub = () =>
	new Proxy(function () {}, {
		get: () => stub(),
		apply: () => stub()
	});

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
	HTMLCanvasElement.prototype.getContext = () =>
		new Proxy({}, { get: (target, key) => (key === 'canvas' ? document.createElement('canvas') : () => ({ data: new Uint8ClampedArray(1 << 16) })) });
});
vi.mock('Utils/WebGL.js', async importOriginal => {
	const { default: WebGL } = await importOriginal();
	return { default: { ...WebGL, createShaderProgram: () => ({ attribute: {}, uniform: {} }) } };
});
vi.mock('Utils/Texture.js', () => ({ default: { load: vi.fn() } }));

// Walk heights, up positive, as Altitude.getCellHeight returns them
const walk = new Map();
vi.mock('Renderer/Map/Altitude.js', () => ({
	default: { getCellHeight: (x, y) => walk.get(`${Math.round(x)},${Math.round(y)}`) ?? 0 }
}));

const { default: Ground } = await import('Renderer/Map/Ground.js');

// A 4x4 ground (8x8 cells), flat at height 0, its shadow map half dark
const WIDTH = 4;
const HEIGHT = 4;

describe('Ground.getShadowFactor', () => {
	beforeAll(() => {
		Ground.init(stub(), {
			width: WIDTH,
			height: HEIGHT,
			meshVertCount: 0,
			mesh: new Float32Array(0),
			lightmap: new Uint8Array(0),
			lightmapSize: 0,
			tileColor: new Uint8Array(WIDTH * HEIGHT * 4),
			textures: [],
			shadowMap: new Uint8Array(WIDTH * 8 * HEIGHT * 8).fill(128),
			cellHeights: new Float32Array(WIDTH * HEIGHT * 4)
		});
	});

	it('darkens an entity standing in the ground shadow', () => {
		expect(Ground.getShadowFactor(3, 3)).toBeCloseTo(128 / 255);
	});

	it('ignores the ground shadow on a bridge well above the ground', () => {
		walk.set('3,3', 4);
		expect(Ground.getShadowFactor(3, 3)).toBe(1.0);
		walk.delete('3,3');
	});

	it('keeps the shadow over small differences in height', () => {
		walk.set('3,3', 0.2);
		expect(Ground.getShadowFactor(3, 3)).toBeCloseTo(128 / 255);
		walk.delete('3,3');
	});

	it('fades the shadow out where a bridge rises off the ground', () => {
		walk.set('3,3', 1.0);
		const factor = Ground.getShadowFactor(3, 3);
		expect(factor).toBeGreaterThan(128 / 255);
		expect(factor).toBeLessThan(1.0);
		walk.delete('3,3');
	});
});
