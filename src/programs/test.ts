import { Program, STATUS_NOT_IMPLEMENTED} from 'programs/program';

export class Test extends Program {
    run(mem: {}): number {
        console.log('Hi from Test program');

        return STATUS_NOT_IMPLEMENTED;
    }
}
