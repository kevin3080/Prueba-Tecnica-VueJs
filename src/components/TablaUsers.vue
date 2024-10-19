<template>
  <div class="state" v-if="error">
    <p>{{ errorMessage }}</p>
  </div>
  <div class="state" v-if="isLodading && !error && !isUserNotFound">
    <p>Cargando...</p>
  </div>
  <div class="state" v-if="isUserNotFound">
    <p>Usuario "{{ searchName }}" no encontrado</p>
  </div>
  <table v-if="!isLodading && !error && !isUserNotFound">
    <thead>
      <tr class="titleTb">
        <th>Picture</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Country</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="changeColor ? 'col active' : 'col'"
        v-for="user in users"
        :key="user.email"
      >
        <td>
          <img
            class="imgUser"
            :src="user.picture.large"
            alt=""
            width="50"
            height="50"
          />
        </td>
        <td class="desc">{{ user.name.first }}</td>
        <td class="desc">{{ user.name.last }}</td>
        <td class="desc">{{ user.location.country }}</td>
        <td class="desc">
          <button class="btn" @click="onDelete(user.email)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { Result } from "../types/Users";

const props = defineProps({
  users: {
    type: Array as () => Result[],
    required: true,
  },
  errorMessage: {
    type: String,
    required: true,
  },
  error: {
    type: Boolean,
    required: true,
  },
  isLodading: {
    type: Boolean,
    required: true,
  },
  changeColor: {
    type: Boolean,
    required: true,
  },
  isUserNotFound: {
    type: Boolean,
    required: true,
  },
  searchName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "delete-user", email: string): void;
}>();

const onDelete = (email: string) => {
  if (!props.users) {
    return;
  }
  emit("delete-user", email);
};
</script>

<style scope>
table {
  width: 97%;
  margin-top: 2rem;
  text-align: center;
}

.desc {
  width: 20%;
}
.state {
  margin-top: 2rem;
}
.titleTb {
  font-weight: normal;
}

.imgUser {
  border-radius: 50%;
}


.col > td:nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
}

.col:nth-child(even).active {
  background-color: var(--colBg2);
}
.col:nth-child(odd).active {
  background-color: var(--colBg1);
}
</style>
