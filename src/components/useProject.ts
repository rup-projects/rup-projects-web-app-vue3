import {Project} from "../models/project.ts";
import {computed, onMounted, ref} from "vue";
import {deleteProject as deletePr , getProject} from "../services/ApiServices.ts";

export function useProject() {

    const projects = ref<Project[]>([]);

    onMounted(() => {
        getProject().then((response) => {
            projects.value = response.data
        })
    })

    const firstProject = computed(() => {
        return projects.value[0]
    })

    const deleteProject = () => {
        deletePr().then()
        projects.value = [];
    }


    return { projects, firstProject, deleteProject }




}
