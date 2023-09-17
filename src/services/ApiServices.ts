import {CreateUseCaseDto, UseCase} from "../models/use-case";
import {api} from "./api";
import {Member} from "../models/member";
import {Phase} from "../models/phase.ts";
import {Iteration} from "../models/iteration.ts";
import {CreateProjectDto, PreCreateProjectDto, Project} from "../models/project.ts";

export async function getUserCases(): Promise<UseCase[]> {
    return api.get(`use-cases/`)
}

export async function getUserCase(id: string): Promise<UseCase[]> {
    return api.get(`use-cases/${id}`)
}

export async function createUseCase(useCase: CreateUseCaseDto): Promise<UseCase> {
    return api.post(`use-cases`, useCase);
}

export async function updateUseCase(useCase: UseCase): Promise<void> {
    return api.put(`use-cases/${useCase.id}`, useCase);
}


export async function getMembers(): Promise<Member[]> {
    return api.get(`members/`)
}

export async function getMember(id: string): Promise<UseCase[]> {
    return api.get(`members/${id}`)
}

export async function updateMember(member: Member): Promise<void> {
    return api.put(`members/${member.id}`, member);
}

export async function createMember(member: Member): Promise<Member> {
    return api.post(`members`, member);
}



export async function getPhases(): Promise<Phase[]> {
    return api.get(`phases/`)
}

export async function getProject(): Promise<Project> {
    return api.get(`projects/`)
}

export async function deleteProject(): Promise<void> {
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


