import { Program, STATUS_NOT_IMPLEMENTED, STATUS_RUNNING, STATUS_FINISHED } from 'programs/program';

interface SpawnCreepMemory {
    spawnId: Id<StructureSpawn>;
    body: [BodyPartConstant];
    creepName: string;

    out_creepId: Id<Creep>;
    out_err: ScreepsReturnCode;
}

export class SpawnCreep extends Program {
    type = 'spawnCreep';

    public start(spawnId: Id<StructureSpawn>, body: string[], creepName: string): any {
        // Check the spawn exists, if not, exit with error
        if (Game.getObjectById<Id<StructureSpawn>>(spawnId) == null) {
            throw ReferenceError('Spawn id not found');
        }

        if (creepName in Game.creeps) {
            throw Error('This creep name is already in use');
        }

        return {
            spawnId: spawnId,
            body: body,
            creepName: creepName
        }
    }

    public run(pid: string, mem: SpawnCreepMemory): number {
        if (Game.creeps[mem.creepName]) {
            mem.out_creepId = Game.creeps[mem.creepName].id;
            return STATUS_FINISHED;
        }

        let spawn = Game.getObjectById(mem.spawnId);
        if (!spawn) {
            mem.out_err = ERR_NOT_FOUND;
            return STATUS_FINISHED
        }

        let result = spawn.spawnCreep(mem.body, mem.creepName);
        if (result == OK) {
            return STATUS_FINISHED;
        } else {
            mem.out_err = result;
        }

        return STATUS_RUNNING;
    }

    // Get result function (kill=true) ??
}
