<script lang="ts">
  import { Card } from '$lib/components/card';
  import { CheckmarkIcon, CloseIcon } from '$lib/components/icons';

  export let type: 'success' | 'error', title: string, message: string;
</script>

<div class="message">
  <Card>
    <div class="message-content">
      <div
        class="icon"
        class:success={type == 'success'}
        class:error={type == 'error'}
      >
        {#if type == 'success'}
          <CheckmarkIcon />
        {:else}
          <CloseIcon />
        {/if}
      </div>
      <h1 class="title">{title}</h1>
      <p>{message}</p>
    </div>
  </Card>
</div>

<style lang="sass">
  .icon
    display: flex
    justify-content: center
    align-items: center
    width: 6rem
    height: 6rem
    margin-bottom: 1rem
    border: .25rem solid
    border-radius: 50%

    &.success
      color: #48c78e

    &.error
      color: #f14668

    :global(svg)
      width: 4rem
      height: 4rem

  .message-content
    display: flex
    flex-direction: column
    align-items: center

  .title
    font-size: 1.5rem
    color: #000
    margin-bottom: .5rem
</style>
