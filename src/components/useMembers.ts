import {getMembers} from "../services/ApiServices.ts";
import {onMounted, ref} from "vue";
import {Member} from "../models/member.ts";

export function useMembers() {

    const members = ref<Member[]>([]);

    onMounted(() => {
            getMembers().then((response) => {
                members.value = response.data
            })

        }
    );
    return {members};

}
