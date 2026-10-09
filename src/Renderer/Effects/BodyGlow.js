/**
 * Renderer/Effects/BodyGlow.js
 *
 * Has its owner's own sprite drawn by adding light, as Berserk's body is,
 * while it lasts. It draws nothing itself: it marks the owner, and
 * EntityRender reads the mark.
 *
 * An iRO Ragexe.exe (October 2026) does this for EF_WHITEBODY (1065) and
 * effect 1131 by setting a flag on the owner (bit 0 at +0xe8), which turns the
 * owner's sprite from render mode 1 (alpha-blended) to 5 (added). It also sets
 * the owner's colour to white, keeping its alpha, which is the colour a body
 * already has.
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 */

import EntityManager from 'Renderer/EntityManager.js';

export default class BodyGlow {
	static ready = true;
	static renderBeforeEntities = true;
	static beforeRender() {}
	static afterRender() {}

	/**
	 * @param {object} owner the entity whose body is drawn added
	 */
	constructor(owner) {
		this.owner = owner || null;
		if (this.owner) {
			// A count, not a flag: two effects can mark one body.
			this.owner._additiveBody = (this.owner._additiveBody || 0) + 1;
		}
		// EffectManager renders an instance only once it is ready.
		this.ready = true;
	}

	render() {
		if (!this.owner || EntityManager.get(this.owner.GID) !== this.owner) {
			this.needCleanUp = true;
		}
	}

	free() {
		if (this.owner && this.owner._additiveBody > 0) {
			this.owner._additiveBody--;
		}
		this.owner = null;
	}
}
