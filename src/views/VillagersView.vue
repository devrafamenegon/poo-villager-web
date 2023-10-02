<template>
  <v-container>
    <v-row v-if="!isLoading">
      <v-col cols="12">
        <VillagersTable :villagers="data" @update="getData"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import VillagersTable from "@/components/VillagersTable.vue";
import { defineComponent, ref } from 'vue';
import { api, enpointVillagers } from '@/services/config/httpClient';

export default defineComponent({
  name: 'VillagersView',
  components: {
    VillagersTable,
  },
  setup() {
    const data = ref([]);
    const isLoading = ref(true);
    const showVillagersTable = ref(false);

    const getData = () => {
      api.get(enpointVillagers)
        .then(response => {
          data.value = response.data.data;
          isLoading.value = false;
          console.log(data.value);
        })
        .catch(error => {
          console.error('Failed to get data:', error);
          isLoading.value = false;
        });
    };

    return { data, isLoading, showVillagersTable, getData }
  },
  mounted() {
    this.getData();
  }
})

</script>
