<template>
  <div class="home">
    <div v-for="(ins, i) in instruments" :key="i">
      <h2>{{ ins.name }}</h2>
    </div>
  </div>
</template>

<script>
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
  name: 'Home',
  setup() {
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
      instruments
    }
  }
}
</script>