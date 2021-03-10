<template>
  <div class="create">
    <h1>Create new instrument</h1>
    <form @submit="submit" >
      <div class="form__group">
        <label for="name">Name</label>
        <input type="text" v-model="name" id="name">
      </div>
      <div class="form__group">
        <label for="type">Type</label>
        <input type="text" v-model="type" id="type">
      </div>
      <div class="form__group">
        <label for="model">Model</label>
        <input type="text" v-model="model" id="model">
      </div>
      <button type="submit">Create instrument</button>
    </form>
  </div>
</template>

<script>
  import { ref, computed } from 'vue';
  import { useMutation } from '@vue/apollo-composable';
  import gql from 'graphql-tag'
  import { useStore } from "vuex";

  export default {
    name: 'Create',
    setup() {
      const name = ref('');
      const type = ref('');
      const model = ref('');

	    const { state } = useStore();
	    const user = computed(() => state.user);

      const { mutate: createInstrument } = useMutation(gql`
        mutation createInstrument($input: createInstrumentInput) {
          createInstrument(input: $input) {
            instrument {
              id,
              name,
            },
          }
        }
      `);

      async function submit(e) {
        e.preventDefault();
        try {
          const res = await createInstrument({
            input: {
              data: {
                name: name.value,
                type: type.value,
                model: model.value,
                createdAt: Date.now(),
                user: user.value.id,
              }
            },
          });
          console.log(res);
        } catch (e) {
          console.error(e);
        }
      }

      return {
        name,
        type,
        model,
        submit,
      }
    }
  }
</script>

<style lang="scss">
  .form__group {
    max-width: 300px;
    margin: 0 auto 16px auto;

    label {
      text-align: left;
      display: block;
    }

    input {
      width: 100%;
    }
  }
</style>