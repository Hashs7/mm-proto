<template>
  <div class="home">
    <div v-for="(ins, i) in result.instruments" :key="i">
      <h2>{{ ins.name }}</h2>
    </div>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable'
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

    return {
      result
    }
  }
}
</script>