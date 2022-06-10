<script lang="ts">
  import '../sass/minireset.sass';
  import '../sass/global.sass';
</script>

<div class="container">
  <slot />
</div>

<style lang="sass">
  .container
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
</style>
