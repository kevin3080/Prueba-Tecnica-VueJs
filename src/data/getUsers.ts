import { fetchData } from "@/types/FetchData";

export async function getUsers({users, userInitial, filteredUsers, userError, errorMessage, url}: fetchData) {
    await fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Error al cargar los datos");
      return res.json();
    })
    .then((res) => {
      users.value = res.results;
      userInitial.value = [...res.results];
      filteredUsers.value = res.results;
    })
    .catch((error) => {
      const haveError = (userError.value = true);
      const errorMsg = (errorMessage.value = error.message);
      return {
        haveError,
        errorMsg,
      };
    });
  }
