import { Program, STATUS_NOT_IMPLEMENTED } from 'programs/program';

export class SpawnCreep extends Program {
    type = 'spawnCreep';

    start(spawnId: Id<StructureSpawn>, body: string[], creepName: string): any {
        // Check the spawn exists, if not, exit with error
        if (Game.getObjectById<Id<StructureSpawn>>(spawnId) == null) {
            throw ReferenceError('Spawn id not found');
        }

        // Check the body definition is valid, if not, exit with error

        // Check the creepName is not in use (append number so we don't block)

        return {
            spawnId: spawnId,
            body: body,
            creepName: creepName
        }
    }
}
