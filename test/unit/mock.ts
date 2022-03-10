export const Game: {
  creeps: { [name: string]: any };
  rooms: any;
  spawns: any;
  time: any;
  getObjectById<T>(id: Id<T>): T | null;
} = {
  creeps: {},
  rooms: [],
  spawns: {},
  time: 12345,
  getObjectById<T>(id: Id<T>) { return null; } // This will be mocked in each test where an object should be found
};

export const Memory: {
  creeps: { [name: string]: any };
  os?: {
    'processes': {[pid: string]: any},
  };
} = {
  creeps: {},
};
