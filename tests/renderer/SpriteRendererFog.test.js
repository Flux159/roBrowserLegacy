import { beforeEach, describe, expect, it, vi } from 'vitest';

// A sprite that adds light (SRC_ALPHA, ONE) is drawn on black, and black must
// add nothing. The shader fades with distance towards the fog's colour, so on
// a foggy map (Comodo field, Beach Dungeon) the whole quad of an additive
// sprite added that colour: a pale square around Jupitel Thunder's ball.
vi.mock('Utils/WebGL.js', () => ({
	default: { createShaderProgram: () => ({ attribute: {}, uniform: { uFogColor: 'uFogColor' } }) }
}));
vi.mock('Renderer/Camera.js', () => ({ default: { zoom: 1, getLatitude: () => 0 } }));

const { default: SpriteRenderer } = await import('Renderer/SpriteRenderer.js');

const FOG = { use: true, exist: true, near: 30, far: 180, color: [0.4, 0.6, 0.6] };

function fakeGL() {
	const fogColors = [];
	const gl = new Proxy(
		{
			uniform3fv: (location, value) => location === 'uFogColor' && fogColors.push(Array.from(value)),
			createBuffer: () => ({}),
			isEnabled: () => true
		},
		{ get: (target, key) => (key in target ? target[key] : typeof key === 'string' && /^[A-Z_0-9]+$/.test(key) ? key : () => {}) }
	);
	return { gl, fogColors };
}

describe('SpriteRenderer fog for sprites that add light', () => {
	let gl, fogColors;

	beforeEach(() => {
		({ gl, fogColors } = fakeGL());
		SpriteRenderer.init(gl);
		SpriteRenderer.bind3DContext(gl, new Float32Array(16), new Float32Array(16), FOG);
		fogColors.length = 0;
	});

	it('fades an additive sprite towards black', () => {
		SpriteRenderer.fogToBlack(true);
		expect(fogColors).toEqual([[0, 0, 0]]);
	});

	it("goes back to the map's fog colour for the next sprite", () => {
		SpriteRenderer.fogToBlack(true);
		SpriteRenderer.fogToBlack(false);
		expect(fogColors.at(-1).map(v => +v.toFixed(2))).toEqual(FOG.color);
	});

	it('only uploads the colour when it changes', () => {
		SpriteRenderer.fogToBlack(false);
		SpriteRenderer.fogToBlack(true);
		SpriteRenderer.fogToBlack(true);
		expect(fogColors).toHaveLength(1);
	});

	it("starts each frame on the map's fog colour", () => {
		SpriteRenderer.fogToBlack(true);
		SpriteRenderer.bind3DContext(gl, new Float32Array(16), new Float32Array(16), FOG);
		SpriteRenderer.fogToBlack(false);
		expect(fogColors.at(-1).map(v => +v.toFixed(2))).toEqual(FOG.color);
		expect(fogColors).toHaveLength(2);
	});
});
