import { Program, STATUS_NOT_IMPLEMENTED} from 'programs/program';

export class Init extends Program {
    type = 'init';

    run(pid: string, mem: {}): number {
        console.log(pid + '::Hi from Init');

        return STATUS_NOT_IMPLEMENTED;
    }
}
