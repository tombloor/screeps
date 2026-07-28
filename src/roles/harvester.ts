export function run(creep: Creep): void {
  // Toggle working state based on energy level
  if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.working = false;
  }
  if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    // Deliver energy to spawn
    const spawn = creep.room.find(FIND_MY_SPAWNS)[0];
    if (!spawn) {
      return;
    }
    const result = creep.transfer(spawn, RESOURCE_ENERGY);
    if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }
  } else {
    // Harvest energy from source
    const sources = creep.room.find(FIND_SOURCES);
    if (sources.length === 0) {
      return;
    }
    const source = sources[0];
    const result = creep.harvest(source);
    if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }
}
