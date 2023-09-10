import {Phase} from './phase';
import {Id} from "../commons/model/id.ts";
export interface Project {

  id: Id;
  startDate: Date;
  endDate: Date;
  cost: number;
  phases: Phase[];
  iterationSize: number;
  numberOfIterations: number;

}

export type CreateProjectDto = Pick<Project, 'startDate' | 'endDate' | 'cost' | 'numberOfIterations'>;

export type PreCreateProjectDto = Pick<Project, 'startDate' | 'endDate' | 'cost'>;
