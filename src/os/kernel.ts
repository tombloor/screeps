import { Program, Init, Test } from 'programs';

export const installed_programs: {[name: string]: Program} = {
    'test': new Test(),
    'init': new Init()
}

export class Kernel {
    private static setupMemory() {
        Memory.os = {
            'processes': {}
        }
    }

    public static boot() {
        if (!('os' in Memory)) {
            Kernel.setupMemory();
        }

        if (!(0 in Memory.os.processes)) {
            Memory.os.processes[0] = { 'type': 'init' };
        }
    }

    public static run(pid: string) {
        let mem = Memory.os.processes[pid];
        let prog = installed_programs[mem.type];

        // Check mem.status to decide if we need to run this or not (Not completed, killed)

        let result = prog.run(mem);

        mem.status = result;

        // Do something with killed,
    }
}
