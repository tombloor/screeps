
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
}
