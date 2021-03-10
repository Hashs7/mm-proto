<template>
  <div class="list">
    <h2>Tous les instruments</h2>
    <span v-if="error">{{ error }}</span>
    <div v-for="(ins, i) in instruments" :key="i">
      <h3>{{ ins.name }}</h3>
    </div>
    <h2>Mes instruments</h2>
    <div v-for="(ins, i) in userInstruments?.instruments" :key="i">
      <h3>{{ ins.name }}</h3>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useStore } from "vuex";

export default {
  name: 'List',
  setup() {
  	const { state } = useStore();
  	const user = computed(() => state.user);
	  const { result, error } = useQuery(gql`
      query getInstruments {
        instruments {
          id,
          name
        }
      }
    `);
    const instruments = useResult(result);

	  const userInst = useQuery(gql`
      query getUserInstrument($id: ID!) {
        user(id: $id) {
            instruments {
                id,
                name,
            }
        }
      }
    `, () => ({
		  id: user.value?.id,
	  }), () => ({
		  enabled: !!user.value,
	  }));
	  const userInstruments = useResult(userInst.result);

    return {
      instruments,
	    error,
	    userInstruments,
    }
  }
}
</script>