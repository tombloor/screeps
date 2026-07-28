import { assert } from "chai";
import { run } from "../../src/managers/spawnManager";
import { Game } from "./mock";

describe("spawnManager", () => {
  let spawn: any;

  beforeEach(() => {
    // @ts-ignore : allow adding Game to global
    global.Game = _.clone(Game);
    global.Game.creeps = {};

    spawn = {
      spawning: null,
      room: { name: "W1N1", energyAvailable: 300 },
      spawnCreep: () => OK
    };
  });

  it("should export a run function", () => {
    assert.isFunction(run);
  });

  it("should spawn a harvester when count is below target", () => {
    let spawned = false;
    spawn.spawnCreep = () => { spawned = true; return OK; };
    run(spawn);
    assert.isTrue(spawned);
  });

  it("should not spawn when already spawning", () => {
    let spawned = false;
    spawn.spawning = { name: "Existing" };
    spawn.spawnCreep = () => { spawned = true; return OK; };
    run(spawn);
    assert.isFalse(spawned);
  });

  it("should not spawn when harvester count meets target", () => {
    let spawned = false;
    // @ts-ignore : override global Game creeps for test
    global.Game.creeps = {
      h1: { memory: { role: "harvester" } } as any,
      h2: { memory: { role: "harvester" } } as any
    };
    spawn.spawnCreep = () => { spawned = true; return OK; };
    run(spawn);
    assert.isFalse(spawned);
  });

  it("should set correct memory when spawning a harvester", () => {
    let spawnedMemory: any = null;
    spawn.spawnCreep = (_body: any, _name: any, opts: any) => {
      spawnedMemory = opts.memory;
      return OK;
    };
    run(spawn);
    assert.equal(spawnedMemory.role, "harvester");
    assert.equal(spawnedMemory.room, "W1N1");
    assert.isFalse(spawnedMemory.working);
  });
});
