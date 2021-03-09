<template>
  <div class="list">
    <h2>Tous les instruments</h2>
    <div v-for="(ins, i) in instruments" :key="i">
      <h3>{{ ins.name }}</h3>
    </div>
    <h2>Mes instruments</h2>
    <div v-for="(ins, i) in ownInstruments" :key="i">
      <h3>{{ ins.name }}</h3>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
  name: 'List',
  setup() {
    const ownInstruments = ref([]);
    const { result } = useQuery(gql`
      query getInstruments {
        instruments {
          id,
          name
        }
      }
    `);
    const instruments = useResult(result);

    return {
      instruments,
      ownInstruments,
    }
  }
}
</script>