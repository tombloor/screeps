//@ts-nocheck

import { assert } from "chai"
import { Kernel } from "os/kernel";
import {Memory} from '../mock';

describe('kernel.boot (fresh)', () => {
    beforeEach(() => {
        global.Memory = _.cloneDeep(Memory);
    })

    it('should ensure memory.os is defined', () => {
        Kernel.boot();
        assert.isDefined(global.Memory.os);
    });

    it('should ensure processes collection is defined', () => {
        Kernel.boot();
        assert.isDefined(global.Memory.os['processes']);
    });
});

describe('kernel.boot', () => {
    beforeEach(() => {
        global.Memory = _.cloneDeep(Memory);
    });

});
