import {Id} from "../commons/model/id.ts";

export interface UseCase {
  id: Id;
  name: string;
  description: string;
  priority: number;
}

export type CreateUseCaseDto = Omit<UseCase, 'id'>;


