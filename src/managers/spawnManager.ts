const TARGET_HARVESTER_COUNT = 2;

export function run(spawn: StructureSpawn): void {
  if (spawn.spawning) {
    return;
  }

  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === "harvester");

  if (harvesters.length < TARGET_HARVESTER_COUNT) {
    const newName = `Harvester${Game.time}`;
    const result = spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: "harvester", room: spawn.room.name, working: false }
    });

    if (result === OK) {
      console.log(`Spawning new harvester: ${newName}`);
    }
  }
}
