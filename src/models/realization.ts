import {Activity} from './activity';
import {Member} from './member';
import {Id} from "../commons/model/id.ts";

export interface Realization {

    id: Id;
    member: Member;
    activities: Activity[];

}
