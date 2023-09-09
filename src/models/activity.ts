import {Id} from "../commons/model/id.ts";

export interface Activity {

  id: Id;
  description: string;
  hours: number;
  startDateTime: Date;

}
