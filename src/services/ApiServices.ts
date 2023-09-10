import {UseCase} from "../models/use-case";
import {api} from "./api";
import {Member} from "../models/member";
import {Phase} from "../models/phase.ts";
import {Iteration} from "../models/iteration.ts";
import {CreateProjectDto, PreCreateProjectDto, Project} from "../models/project.ts";

export async function getUserCases(): Promise<UseCase[]> {
    return api.get(`use-cases/`)
}

export async function getMembers(): Promise<Member[]> {
    return api.get(`members/`)
}

export async function getPhases(): Promise<Phase[]> {
    return api.get(`phases/`)
}

export async function getProject(): Promise<Project> {
    return api.get(`projects/`)
}

export async function deletePr(): Promise<void> {
    return api.delete(`projects`)
}


export async function getIterations(slug: string): Promise<Iteration[]> {
    return api.get(`phases/${slug}/iterations`)
}

export async function getIteration(slug: string): Promise<Iteration> {
    return api.get(`iterations/${slug}`)
}

export async function preCreateProject(project: PreCreateProjectDto | CreateProjectDto): Promise<Project> {
    return api.post(`projects/planned`, project);
}

export async function createProject(project: CreateProjectDto): Promise<Project> {
    return api.post(`projects`, project);
}


