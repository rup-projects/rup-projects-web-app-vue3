import {Phase} from "../models/phase.ts";
import {getPhases} from "../services/ApiServices.ts";
import {onMounted, ref} from "vue";

export function usePhases() {

    const phases = ref<Phase[]>([]);

    onMounted( () => {
            getPhases().then(response =>
                phases.value = response.data
            );
        }
    );

    return { phases };

}
