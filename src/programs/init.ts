import { Program, STATUS_NOT_IMPLEMENTED} from 'programs/program';

export class Init extends Program {
    run(mem: {}): number {
        console.log('Hi from Init');

        return STATUS_NOT_IMPLEMENTED;
    }
}
