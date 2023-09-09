import {NotAssignedCost} from './not-assigned-cost';
import {Realization} from './realization';
import {Id} from "../commons/model/id.ts";



export interface Iteration {

    id: Id;
    number: number;
    startDate: Date;
    endDate: Date;
    dateTimes?: Date[];
    notAssignedCosts: NotAssignedCost[];
    realizations: Realization[];

}
