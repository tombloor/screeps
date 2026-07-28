# Energy Collection Feature Implementation Plan

## Objective
Implement autonomous energy collection and delivery system using harvester creeps that collect energy from sources and deliver it to the spawn.

## Prerequisites
- Current codebase is a minimal TypeScript starter
- `src/main.ts` contains only the game loop skeleton
- `CreepMemory` interface already defines `role`, `room`, and `working` properties
- No existing creep roles or behaviors implemented

## Implementation Tasks

### Task 1: Create Harvester Role Module
**File:** `src/roles/harvester.ts`

Create a new directory `src/roles/` and implement the harvester role with the following behavior:

1. **State Machine Logic:**
   - When creep is empty: move to nearest source and harvest energy
   - When creep is full: move to spawn and transfer energy
   - Switch states based on `creep.store.getFreeCapacity()` and `creep.store.getUsedCapacity()`

2. **Implementation Requirements:**
   - Export a `run(creep: Creep)` function as the main entry point
   - Use `creep.memory.working` to track state (false = harvesting, true = delivering)
   - Find sources using `creep.room.find(FIND_SOURCES)`
   - Find spawn using `creep.room.find(FIND_MY_SPAWNS)[0]`
   - Handle movement with `creep.moveTo(target)`
   - Execute actions with `creep.harvest(source)` and `creep.transfer(spawn, RESOURCE_ENERGY)`

3. **Error Handling:**
   - Check if source exists before harvesting
   - Check if spawn exists before transferring
   - Handle `ERR_NOT_IN_RANGE` by moving closer
   - Handle full spawn by continuing to harvest or waiting

**Example Structure:**
```typescript
export function run(creep: Creep): void {
  // Toggle working state when empty or full
  if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.working = false;
  }
  if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = true;
  }

  // Execute behavior based on state
  if (creep.memory.working) {
    // Deliver energy to spawn
  } else {
    // Harvest from source
  }
}
```

### Task 2: Create Spawn Manager Module
**File:** `src/managers/spawnManager.ts`

Implement spawn management logic to maintain harvester population:

1. **Population Management:**
   - Count active harvesters: filter `Game.creeps` by `role === 'harvester'`
   - Define target harvester count (start with 2-4)
   - Spawn new harvesters when count is below target

2. **Spawning Logic:**
   - Check if spawn is not already spawning: `!spawn.spawning`
   - Check available energy: `spawn.room.energyAvailable`
   - Define harvester body based on available energy (minimum: `[WORK, CARRY, MOVE]`)
   - Generate unique creep name using `Game.time` or UUID
   - Set initial memory: `{ role: 'harvester', room: spawn.room.name, working: false }`

3. **Implementation Requirements:**
   - Export a `run(spawn: StructureSpawn)` function
   - Handle spawn errors gracefully
   - Log spawn events for debugging

**Example Structure:**
```typescript
export function run(spawn: StructureSpawn): void {
  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
  
  if (harvesters.length < 2) {
    const newName = `Harvester${Game.time}`;
    const result = spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: 'harvester', room: spawn.room.name, working: false }
    });
    
    if (result === OK) {
      console.log(`Spawning new harvester: ${newName}`);
    }
  }
}
```

### Task 3: Integrate into Main Loop
**File:** `src/main.ts`

Update the main game loop to orchestrate harvester behavior and spawning:

1. **Import Required Modules:**
   ```typescript
   import * as harvesterRole from "roles/harvester";
   import * as spawnManager from "managers/spawnManager";
   ```

2. **Add Creep Dispatch Logic:**
   - After memory cleanup, iterate through `Game.creeps`
   - Dispatch each creep to its role handler based on `creep.memory.role`
   - Start with only 'harvester' role support

3. **Add Spawn Management:**
   - Iterate through `Game.spawns`
   - Call spawn manager for each spawn

4. **Maintain Existing Functionality:**
   - Keep automatic memory cleanup for missing creeps
   - Keep error mapping wrapper
   - Keep console log for game tick

**Integration Points:**
```typescript
// After memory cleanup loop
for (const name in Game.creeps) {
  const creep = Game.creeps[name];
  if (creep.memory.role === 'harvester') {
    harvesterRole.run(creep);
  }
}

// Spawn management
for (const spawnName in Game.spawns) {
  const spawn = Game.spawns[spawnName];
  spawnManager.run(spawn);
}
```

## File Structure After Implementation
```
src/
├── main.ts                 # Updated: game loop with role dispatch and spawn management
├── roles/
│   └── harvester.ts        # New: harvester role logic
├── managers/
│   └── spawnManager.ts     # New: spawn management logic
└── utils/
    └── ErrorMapper.ts      # Existing: no changes needed
```

## Validation Steps

After each implementation task:

1. **Lint the code:**
   ```bash
   npm run lint
   ```

2. **Build the code:**
   ```bash
   npm run build
   ```

3. **Run unit tests:**
   ```bash
   npm run test-unit
   ```

4. **Fix any errors before proceeding to the next task**

## Testing in Screeps

After all tasks are complete:

1. Deploy to Screeps simulator or private server
2. Verify harvesters spawn automatically
3. Observe harvesters collecting energy from sources
4. Confirm energy is delivered to spawn
5. Monitor CPU usage (should be low, < 1 CPU per creep)

## Success Criteria

- [x] Harvester role module created and functional
- [x] Spawn manager maintains 2+ harvesters
- [x] Harvesters autonomously harvest from sources
- [x] Harvesters deliver energy to spawn
- [x] Code passes linting and builds successfully
- [x] No TypeScript compilation errors
- [x] Memory cleanup still functions for dead creeps

## Edge Cases to Handle

1. **No sources in room:** Harvester should idle or log error
2. **Spawn is full:** Harvester should wait or continue harvesting
3. **Source depleted:** Harvester should wait for regeneration
4. **Creep stuck:** Pathfinding should eventually resolve or timeout
5. **Insufficient energy to spawn:** Wait until enough energy available

## Future Enhancements (Not in Scope)

- Multiple creep roles (builders, upgraders)
- Dynamic source assignment based on proximity
- Creep count balancing per source
- Priority spawning when energy critical
- Container-based energy logistics
- Energy harvesting from dropped resources

## Notes

- Start simple: basic harvester that works end-to-end
- Optimize later: focus on functionality first
- Follow existing TypeScript conventions in the codebase
- Keep CPU usage minimal (avoid expensive calculations per tick)
- Use creep memory for state, not global variables
