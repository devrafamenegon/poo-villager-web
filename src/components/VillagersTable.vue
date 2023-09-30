<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="(headers as any)"
          :items="villagers"
          item-key="id"
          @click:row="selectVillager"
        >
          <template v-slot:top>
            <v-toolbar>
              <v-toolbar-title>Registered Villagers</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn @click="createVillager" :disabled="isCreating" color="success">
                Criar
              </v-btn>
              <v-btn
                @click="editVillager"
                :disabled="!selectedVillager || isCreating"
                color="warning"
              >
                Editar
              </v-btn>
              <v-btn
                @click="deleteVillager"
                :disabled="!selectedVillager || isCreating"
                color="error"
              >
                Excluir
              </v-btn>

            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row v-if="(selectedVillager !== null) && (isEditing || isCreating)">
      <v-col cols="12">
        <v-form ref="form" @submit.prevent="saveEdit">
          <v-text-field v-model="selectedVillager.name" label="Nome"></v-text-field>
          <v-text-field v-model="selectedVillager.email" label="Email"></v-text-field>
          <v-text-field v-model="selectedVillager.block" label="Bloco" type="number"></v-text-field>
          <v-text-field v-model="selectedVillager.apartment" label="Apartamento" type="number"></v-text-field>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-btn @click="saveEdit" :disabled="isCreating" color="success">
                {{ isCreating ? 'Criar' : 'Salvar' }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn @click="cancelEdit" color="grey">
                Cancelar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  VDataTable,
} from "vuetify/labs/VDataTable";

interface Villager {
  id: number;
  name: string ;
  email: string ;
  block: number;
  apartment: number;
}

export default defineComponent({
  name: 'VillagersTable',
  props: {
    villagers: {
      type: Array as () => Villager[],
      required: true,
    }
  },
  components: {
    VDataTable
  },
  data() {
    return {
      selectedVillager: null as any,
      isEditing: false,
      isCreating: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Bloco', value: 'block' },
        { text: 'Apartamento', value: 'apartment' },
      ],
    };
  },
  methods: {
    selectVillager(item: any) {
      this.selectedVillager = item;
    },
    createVillager() {
      this.selectedVillager = { id: null, name: '', email: '', block: null, apartment: null };
      this.isEditing = false;
      this.isCreating = true;
    },
    editVillager() {
      if (this.selectedVillager) {
        this.isEditing = true;
        this.isCreating = false;
      }
    },
    async deleteVillager() {
      if (this.selectedVillager) {
        try {
          // Implemente a lógica para excluir o vilarejo aqui
          console.log('Vilarejo excluído com sucesso.');
        } catch (error) {
          console.error('Erro ao excluir o vilarejo:', error);
        }
      }
    },
    async saveEdit() {
      if (this.selectedVillager) {
        try {
          if (this.isCreating) {
            console.log('Vilarejo criado com sucesso.');
          } else if (this.isEditing) {
            // Implemente a lógica para editar o vilarejo aqui
            console.log('Vilarejo editado com sucesso.');
          }

          this.selectedVillager = null;
          this.isEditing = false;
          this.isCreating = false;
        } catch (error) {
          console.error('Erro ao salvar as alterações no vilarejo:', error);
        }
      }
    },
    cancelEdit() {
      this.selectedVillager = null;
      this.isEditing = false;
      this.isCreating = false;
    },
  },
});
</script>

<style scoped>
/* Adicione seus estilos CSS aqui */
</style>
