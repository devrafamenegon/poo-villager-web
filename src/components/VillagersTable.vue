<template>
  <div class="table-container">
    <custom-notification :show=showNotification :message=notifierMessage />
    <table>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Block</th>
          <th>Apartment</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="villager in villagers"
          :key="villager.id"
          :class="{ 'selected-row': villager === selectedVillager }"
        >
          <td>
            <input
              type="radio"
              @change="selectTableLine(villager)"
              :checked="villager === selectedVillager"
              :disabled="isCreating"
              :class="{ 'disabled-button': isCreating }"
            />
          </td>
          <td>{{ villager.id }}</td>
          <td>{{ villager.name }}</td>
          <td>{{ villager.email }}</td>
          <td>{{ villager.block }}</td>
          <td>{{ villager.apartment }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="btn-container">
    <button
      id="btn-create"
      @click="create()"
    >Criar</button>

    <button
      id="btn-edit"
      @click="edit()"
      :class="{ 'disabled-button': !selectedVillager || isCreating }"
      :disabled="!selectedVillager || isCreating"
    >Editar</button>

    <button
      id="btn-delete"
      @click="deleteVillager"
      :class="{ 'disabled-button': !selectedVillager || isCreating }"
      :disabled="!selectedVillager || isCreating"
    >Excluir</button>
  </div>

  <div class="form-container" v-if="(selectedVillager !== null) && (isEditing || isCreating)">
    <h2>{{ isCreating ? 'Create Villager' : 'Update Villager' }}</h2>
    <form @submit.prevent="saveForm">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="selectedVillager.name" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="selectedVillager.email" />
      </div>
      <div class="form-group">
        <label for="block">Block:</label>
        <input type="number" id="block" v-model="selectedVillager.block" />
      </div>
      <div class="form-group">
        <label for="apartment">Apartment:</label>
        <input type="number" id="apartment" v-model="selectedVillager.apartment" />
      </div>
      <div class="form-actions">
        <button id="form-btn-save" type="submit">{{ isCreating ? 'Create' : 'Save' }}</button>
        <button id="form-btn-cancel" @click="closeForm">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { api, enpointVillagers } from '@/services/config/httpClient';
import { defineComponent } from 'vue';
import CustomNotification from '@/components/CustomNotification.vue';

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
    CustomNotification
  },
  data() {
    return {
      selectedVillager: null as any,
      isEditing: false,
      isCreating: false,
      notifierMessage: '',
      showNotification: false
    };
  },
  watch: {
    showNotification(newValue: boolean) {
      if (newValue) {
        setTimeout(() => {
          this.showNotification = false;
        }, 3000); // 3000 milissegundos = 3 segundos
      }
    }
  },
  methods: {
    updateTable(): void {
      this.$emit('update')
    },

    selectTableLine(villager: Villager): void {
      this.selectedVillager = villager;
    },

    create(): void {
      this.isCreating = true;
      this.isEditing = false;
      this.selectedVillager = {} as Villager;
    },

    edit(): void {
      this.isEditing = true;
      this.isCreating = false;
    },

    async deleteVillager(): Promise<void> {
      if (this.selectedVillager) {
        const villagerId = this.selectedVillager.id;

        try {
          const response = await api.delete(`${enpointVillagers}/${villagerId}`);

          if (response.status === 200) {
            this.notifierMessage = "Villager excluído com sucesso.";
            this.showNotification = true;
          }
        } catch (error) {
          this.notifierMessage = "Erro inesperado.";
          this.showNotification = true;
          console.error('Erro ao excluir o Villager:', error);
        }
      }

      this.updateTable();
      this.selectedVillager = null;
    },

    async saveForm(): Promise<void>  {
      if (this.selectedVillager) {
        if (this.isCreating) {
          try {
            const response = await api.post(`${enpointVillagers}`, this.selectedVillager);

            if (response.status === 200) {
              this.notifierMessage = "Villager criado com sucesso.";
              this.showNotification = true;
              this.updateTable();
              this.closeForm();
            }

            // TODO - se não é 200, cai direto no catch
            if (response.status === 400){
              this.notifierMessage = "Villager não pode ser criado pois possui campos inválidos.";
              this.showNotification = true;
            }

          } catch (error) {
            this.notifierMessage = "Erro inesperado.";
            this.showNotification = true;
            console.error('Erro ao criar o villager:', error);
          }
        }

        if (this.isEditing) {
          try {
            const response = await api.put(`${enpointVillagers}/${this.selectedVillager.id}`, this.selectedVillager);

            if (response.status === 200) {
              this.notifierMessage = "Villager editada com sucesso.";
              this.showNotification = true;
              this.updateTable();
              this.closeForm();
            }

            // TODO - se não é 200, cai direto no catch
            if (response.status === 400){
              this.showNotification = true;
              this.notifierMessage = "Villager não pode ser criado pois possui campos inválidos.";
            }

          } catch (error) {
            this.showNotification = true;
            this.notifierMessage = "Erro inesperado.";
            console.error('Erro ao atualizar o villager:', error);
          }
        }
      }
    },

    closeForm(): void {
      this.selectedVillager = null;
      this.isEditing = false;
      this.isCreating = false;
      this.updateTable();
    },
  }
});
</script>

<style scoped>
  .table-container {
    margin-top: 20px;
    max-height: 350px;
    overflow-y: auto;
    border: 1px solid #ccc;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
  }

  th {
    background-color: #f2f2f2;
  }

  td:first-child {
    width: 2px;
  }

  td:nth-child(2) {
    width: 48px;
  }

  .btn-container {
    margin-top: 25px;
  }

  button {
    padding: 5px 10px;
    margin-right: 10px;
    cursor: pointer;
    color: #fff;
  }

  #btn-create {
    background-color: #49CC8E;
  }

  #btn-edit {
    background-color: #FCA130;
  }

  #btn-delete {
    background-color: #F93E3E;
  }

  .selected-row {
    background-color: #f0f0f0;
  }

  .disabled-button {
    cursor: not-allowed;
  }

  .form-container {
    max-height: 250px;
    overflow-y: auto;
    margin-top: 24px;
    background-color: #fff;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }

  .form-container h2 {
    font-weight: 600;
    margin-bottom: 24px;
  }

  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
  }

  input {
    border: 1px solid #ccc;
    padding: 3px;
  }

  .form-actions {
    margin-top: 15px;
  }

  .form-actions button {
    margin-right: 10px;
  }

  #form-btn-save {
    background-color: #49CC8E;
  }

  #form-btn-cancel {
    background-color: #b6b6b6;
  }
</style>
