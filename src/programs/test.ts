import { Program, STATUS_NOT_IMPLEMENTED} from 'programs/program';

export class Test extends Program {
    run(pid: string, mem: {}): number {
        console.log(pid + '::Hi from Test program');

        return STATUS_NOT_IMPLEMENTED;
    }
}
