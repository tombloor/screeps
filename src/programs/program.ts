
export const STATUS_NOT_IMPLEMENTED=-1
export const STATUS_RUNNING=0
export const STATUS_FINISHED=1
export const STATUS_KILLED=2

export class Program {
    public static type: string = '';

    constructor() {
    }

    public start(...args: any[]): any {
        return { ...args };
    }

    public run(pid: string, mem: {}): number {
        return STATUS_NOT_IMPLEMENTED;
    }
}
