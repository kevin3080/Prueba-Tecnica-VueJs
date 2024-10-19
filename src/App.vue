<template>
  <h1>Prueba Técnica</h1>

  <div class="btn-group">
    <button class="btn" @click="handleChangeColor">Colorear filas</button>
    <button class="btn" @click="changeSortCountry">Ordenar por país</button>
    <button class="btn" @click="resetState">Resetear estado</button>
    <input 
      class="inputSearch" 
      type="search" 
      placeholder="Filtrar por nombre"
      v-model="searchName"
      @input="filterName(searchName)"
      />
  </div>
  <div class="container">
    <TablaUsers
      :changeColor="changeColor"
      :users="users"
      :errorMessage="errorMessage"
      :error="error"
      :isLodading="isLodading"
      :isUserNotFound="isUserNotFound"
      :searchName="searchName"
      @delete-user="deleteUser"
    />
  </div>
</template>

<script lang="ts" setup>
import TablaUsers from "./components/TablaUsers.vue";
import "./App.css";
import { Ref, computed, onMounted, ref } from "vue";
import { Result } from "./types/Users";
import { getUsers } from "./data/getUsers";


const userInitial:Ref<Result[]> = ref([]);
const users: Ref<Result[]> = ref([]);
const userError: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref("");
const sortCountry: Ref<boolean> = ref(false);
const searchName: Ref<string> = ref("");
const filteredUsers: Ref<Result[]> = ref([]);

  const url: string = process.env.VUE_APP_API_URL;

  const changeColor: Ref<boolean> = ref(false);
  const handleChangeColor = () => {
    changeColor.value = !changeColor.value;
  };
  const changeSortCountry = () => {
    sortCountry.value = !sortCountry.value;
  if(sortCountry.value){
      users.value.sort((a, b) => a.location.country.localeCompare(b.location.country));
    }
    else{
      users.value.sort((a, b) => b.location.country.localeCompare(a.location.country));
    }
  };
  
  const resetState = () => {
    users.value = [...userInitial.value];
    filteredUsers.value = [...userInitial.value];
    sortCountry.value = false;
    searchName.value = "";
  };

  const filterName = (name: string) => {
    searchName.value = name;
    if (name) {
      users.value = users.value.filter((user) => user.name.first.toLowerCase().includes(name.toLowerCase()));
    }else{
      users.value = [...filteredUsers.value];
    }
  };
  
  const deleteUser = (email: string) => {
    users.value = users.value.filter(user => user.email !== email);
    filteredUsers.value = users.value;
  };
  const error = computed(() => userError.value === true);
  const isLodading = computed(() => users.value.length === 0 && searchName.value === "");
  const isUserNotFound = computed(() => searchName.value !== "" && users.value.length === 0);



onMounted(() => {
  getUsers({users, userInitial, filteredUsers, userError, errorMessage, url}); 
});
</script>
