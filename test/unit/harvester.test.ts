import { assert } from "chai";
import { run } from "../../src/roles/harvester";

describe("harvester role", () => {
  let creep: any;

  beforeEach(() => {
    creep = {
      memory: { role: "harvester", room: "W1N1", working: false },
      store: {
        [RESOURCE_ENERGY]: 0,
        getFreeCapacity: () => 50,
        getUsedCapacity: () => 0
      },
      room: {
        find: (type: number) => {
          if (type === FIND_SOURCES) {
            return [{ id: "source1" }];
          }
          if (type === FIND_MY_SPAWNS) {
            return [{ id: "spawn1" }];
          }
          return [];
        }
      },
      harvest: () => OK,
      transfer: () => OK,
      moveTo: () => OK
    };
  });

  it("should export a run function", () => {
    assert.isFunction(run);
  });

  it("should switch to working=true when store is full", () => {
    creep.store.getFreeCapacity = () => 0;
    creep.store.getUsedCapacity = () => 50;
    creep.store[RESOURCE_ENERGY] = 50;
    run(creep);
    assert.isTrue(creep.memory.working);
  });

  it("should switch to working=false when energy is depleted", () => {
    creep.memory.working = true;
    creep.store[RESOURCE_ENERGY] = 0;
    creep.store.getFreeCapacity = () => 50;
    creep.store.getUsedCapacity = () => 0;
    run(creep);
    assert.isFalse(creep.memory.working);
  });

  it("should harvest from source when not working", () => {
    let harvested = false;
    creep.harvest = () => { harvested = true; return OK; };
    run(creep);
    assert.isTrue(harvested);
  });

  it("should move to source when harvest returns ERR_NOT_IN_RANGE", () => {
    let movedTo: any = null;
    const source = { id: "source1" };
    creep.room.find = (type: number) => type === FIND_SOURCES ? [source] : [];
    creep.harvest = () => ERR_NOT_IN_RANGE;
    creep.moveTo = (target: any) => { movedTo = target; return OK; };
    run(creep);
    assert.equal(movedTo, source);
  });

  it("should transfer energy to spawn when working", () => {
    let transferred = false;
    const spawn = { id: "spawn1" };
    creep.memory.working = true;
    creep.store[RESOURCE_ENERGY] = 50;
    creep.room.find = (type: number) => type === FIND_MY_SPAWNS ? [spawn] : [];
    creep.transfer = () => { transferred = true; return OK; };
    run(creep);
    assert.isTrue(transferred);
  });

  it("should move to spawn when transfer returns ERR_NOT_IN_RANGE", () => {
    let movedTo: any = null;
    const spawn = { id: "spawn1" };
    creep.memory.working = true;
    creep.store[RESOURCE_ENERGY] = 50;
    creep.room.find = (type: number) => type === FIND_MY_SPAWNS ? [spawn] : [];
    creep.transfer = () => ERR_NOT_IN_RANGE;
    creep.moveTo = (target: any) => { movedTo = target; return OK; };
    run(creep);
    assert.equal(movedTo, spawn);
  });

  it("should return early when no sources found", () => {
    let harvested = false;
    creep.room.find = () => [];
    creep.harvest = () => { harvested = true; return OK; };
    run(creep);
    assert.isFalse(harvested);
  });

  it("should return early when no spawns found and working", () => {
    let transferred = false;
    creep.memory.working = true;
    creep.store[RESOURCE_ENERGY] = 50;
    creep.room.find = () => [];
    creep.transfer = () => { transferred = true; return OK; };
    run(creep);
    assert.isFalse(transferred);
  });
});
