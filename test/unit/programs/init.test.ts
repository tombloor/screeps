//@ts-nocheck

import { assert } from "chai";
import { Init } from "programs";

describe('Init', () => {
    it('should extend Program', () => {
        let init = new Init();
        assert.isDefined(init.run);
        assert.isDefined(init.start);
    });

    it('should have correct type property', () => {
        let init = new Init();
        assert.equal(init.type, 'init');
    })
});
