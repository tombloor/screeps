

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
    }
}
