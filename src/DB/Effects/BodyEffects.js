/**
 * DB/Effects/BodyEffects.js
 *
 * Effect table entries for the effects that change how their owner's own
 * sprite is drawn, spread into EffectTable.js.
 *
 * - EF_WHITEBODY (1065) and effect 1131, which HAT_EF_WHITEBODY2 and
 *   HAT_EF_WHITEBODY name: the body drawn by adding light while the effect
 *   is on (BodyGlow).
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 */

import BodyGlow from 'Renderer/Effects/BodyGlow.js';

/** The owner's body drawn by adding light while the effect is on. */
function additiveBody() {
	return [
		{
			type: 'FUNC',
			attachedEntity: true,
			func: function (Params) {
				this.add(new BodyGlow(Params.Init.ownerEntity), Params);
			}
		}
	];
}

export default {
	1065: additiveBody(), // EF_WHITEBODY
	1131: additiveBody()
};
