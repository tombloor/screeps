import { ErrorMapper } from "utils/ErrorMapper";
import { Kernel } from "os/kernel";

import { SpawnCreep } from 'programs';

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    os: {
      processes: {[pid: string]: any},
      [name:string]: any
    }
  }

  // interface CreepMemory {
  //   role: string;
  //   room: string;
  //   working: boolean;
  // }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

  Kernel.boot();

  // THIS IS FOR TESTING ONLY
  try {
    debugger;
    if (!('1' in Memory.os.processes)) {
      Memory.os.processes['1'] = new SpawnCreep().start(Game.spawns['Spawn1'].id, ['work', 'move', 'carry'], 'testCreep');
      Memory.os.processes['1'].type = 'spawnCreep';
    }
  }
  catch(err) {
    console.log(err);
  }
  //

  for (const pid in Memory.os.processes) {
    Kernel.run(pid);
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
