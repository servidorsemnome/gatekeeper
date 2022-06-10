<form class="form" on:submit|preventDefault>
  <slot />
</form>

<style lang="sass">
  .form
    display: flex
    flex-direction: column
    gap: 1.5rem
</style>
