import { assert } from "chai";
import { SpawnCreep } from "programs";
import { stub, SinonStub } from "sinon";
import { Memory, Game } from '../mock';

describe('SpawnCreep', () => {
    it('should extend Program', () => {
        let spawn = new SpawnCreep();
        assert.isDefined(spawn.run);
        assert.isDefined(spawn.start);
    });

    it('should have correct type property', () => {
        let spawn = new SpawnCreep();
        assert.equal(spawn.type, 'spawnCreep');
    })
});

describe('SpawnCreep.start', () => {
    let gameIdTestSpawn: SinonStub;

    beforeEach(() => {
        //@ts-ignore
        global.Memory = _.cloneDeep(Memory);
        //@ts-ignore
        global.Game = _.cloneDeep(Game);

        gameIdTestSpawn = stub(global.Game, 'getObjectById').callsFake((id) => {
            if (id == 'spawn1') {
                return { test: 'not empty' };
            }

            return null;
        });
    });

    it('should return starting memory state', () => {
        let mem = new SpawnCreep().start(<Id<StructureSpawn>>'spawn1', ['work', 'move', 'carry'], 'creepy');
        assert.equal(mem.spawnId, 'spawn1');
        //assert.equal(mem.body, [WORK, MOVE, CARRY]);
        //assert.equal(mem.creepName, 'creepy');
    });

    it('should throw a reference error if spawn does not exist', () => {
        assert.throws(() => {
            new SpawnCreep().start(<Id<StructureSpawn>>'spawnNull', ['work', 'move', 'carry'], 'creepy');
        });
    });

    afterEach(() => {
        gameIdTestSpawn.restore();
    })
});
