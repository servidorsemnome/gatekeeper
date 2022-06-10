<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Form } from '$lib/components/forms';
  import { RadioInput } from '$lib/components/inputs';

  type grantType = {
    value: string;
    label: string;
  };

  export let value = '',
    grantTypes: grantType[] = [];
</script>

<Form on:submit>
  <div class="options">
    {#each grantTypes as grantType}
      <RadioInput
        value={grantType.value}
        label={grantType.label}
        checked={grantType.value == value}
        on:click={() => (value = grantType.value)}
      />
    {/each}
  </div>
  <div class="buttons">
    <Button small type="button">Cancelar</Button>
    <Button small primary type="submit">Permitir</Button>
  </div>
</Form>

<style lang="sass">
  .options
    display: flex
    flex-direction: column
    gap: .5rem

  .buttons
    display: flex
    justify-content: flex-end
    gap: .75rem
</style>
