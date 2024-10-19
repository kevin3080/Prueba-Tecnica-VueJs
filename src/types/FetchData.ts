import { Ref } from "vue";
import { Result } from "./Users";

export interface fetchData {
    url: string;
    users: Ref<Result[]>;
    userInitial: Ref<Result[]>;
    filteredUsers: Ref<Result[]>;
    userError: Ref<boolean>;
    errorMessage: Ref<string>;
}