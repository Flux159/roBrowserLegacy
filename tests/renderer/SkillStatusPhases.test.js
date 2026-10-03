import { describe, it } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
function manager() {
    const entities = new Map([[100, { position: [10, 20, 0] }]]);
    const calls = [], removed = [];
    const source = readFileSync('src/Renderer/EffectManager.js', 'utf8').replace(/^import .*;\r?$/gm, '').replace('export default EffectManager;', 'this.EffectManager = EffectManager;');
    const context = vm.createContext({ console, Math, Number, SU: {}, EffectDB: {}, SkillEffect: {}, EntityManager: { get: id => entities.get(id) }, Renderer: { tick: 1000 } });
    vm.runInContext(source, context);
    const EffectManager = context.EffectManager;
    EffectManager.spam = params => calls.push(params);
    EffectManager.remove = (...params) => removed.push(params);
    return { EffectManager, entities, calls, removed };
}
describe('server-driven skill phases', () => {
    it('starts a repeating status once, ends it, and restarts after a map epoch', () => {
        const x = manager(), id = 919;
        x.EffectManager.spamOriginalStatus(id, 100, 1, []);
        x.EffectManager.spamOriginalStatus(id, 100, 1, []);
        assert.equal(x.calls.length, 1);
        assert.equal(x.calls[0].persistent, true);
        x.EffectManager.spamOriginalStatus(id, 100, 0, []);
        assert.equal(x.removed.length, 1);
        x.EffectManager.spamOriginalStatus(id, 100, 1, []);
        x.EffectManager.originalStatusEpoch++;
        x.EffectManager.spamOriginalStatus(id, 100, 1, []);
        assert.equal(x.calls.length, 3);
    });
    it('rejects missing and out-of-range counters rather than guessing a variant', () => {
        const x = manager();
        const [id, def] = Object.entries(x.EffectManager.originalStatusPhases).find(([, row]) => row.variants);
        for (const count of [undefined, def.min - 1, def.max + 1, 1.5]) x.EffectManager.spamOriginalStatus(Number(id), 100, 1, [count]);
        assert.equal(x.calls.length, 0);
        x.EffectManager.spamOriginalStatus(Number(id), 100, 1, [def.min]);
        assert.equal(x.calls[0].effectId, def.variants[def.min]);
    });
    it('detaches a unit end phase at its last position and emits it once', () => {
        const x = manager(), entity = { position: [10, 20, 0], creatorGID: 100, _originalUnitEndEffectId: 'known_end' };
        x.EffectManager.spamOriginalUnitEnd(entity);
        entity.position[0] = 99;
        x.EffectManager.spamOriginalUnitEnd(entity);
        assert.equal(x.calls.length, 1);
        assert.deepEqual(Array.from(x.calls[0].position), [10, 20, 0]);
        assert.equal(x.calls[0].ownerAID, undefined);
    });
    it('deduplicates ground audio per owner and resets across map epochs', () => {
        const x = manager();
        assert.equal(x.EffectManager.shouldPlayFourUnitSound('field', 100, 1000), true);
        assert.equal(x.EffectManager.shouldPlayFourUnitSound('field', 100, 1050), false);
        assert.equal(x.EffectManager.shouldPlayFourUnitSound('field', 200, 1050), true);
        x.EffectManager.originalStatusEpoch++;
        assert.equal(x.EffectManager.shouldPlayFourUnitSound('field', 100, 1051), true);
        for (let owner = 0; owner < 200; owner++) x.EffectManager.shouldPlayFourUnitSound('field', owner, 2000);
        assert.ok(x.EffectManager.fourUnitAudioTime.size <= 128);
    });
});
