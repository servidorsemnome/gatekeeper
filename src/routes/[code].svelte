<script lang="ts">
  import { WEBSITE_URL } from '$lib/env';
  import { Card } from '$lib/components/card';
  import { FormGrant } from '$lib/modules/form-grant';

  type Location = {
    city: string;
    region: string;
    country: string;
  };

  export let code = '',
    identity: any = null,
    nickname: string,
    location: Location;

  const getRegion = (loc: Location) =>
    `${loc.city}, ${loc.region}${
      loc.country != 'BR' ? ` (${loc.country})` : ''
    }`;
</script>

<section class="section">
  <a href="{WEBSITE_URL}/dashboard" class="identity">
    <img
      src="https://mc-heads.net/head/{identity?.traits?.primaryNickname}"
      alt=""
    />
    {identity?.traits?.primaryNickname}
  </a>
  <img class="logo" src="/ssn-icon.png" alt="" />
  <Card>
    <div class="card-content">
      <div class="title">
        <h1>Liberar acesso</h1>
        <p>
          Você está tentando se conectar com o usuário <b>{nickname}</b>
          na região de <b>{getRegion(location)}</b>.
        </p>
      </div>
      <FormGrant {code} />
    </div>
  </Card>
</section>

<style lang="sass">
  @import '../sass/vars'

  .section
    display: flex
    flex-direction: column
    align-items: center
    gap: 2rem
    width: 100%
    max-width: 32rem

    .logo
      height: 6rem
      pointer-events: none
      user-select: none

  .title
    h1
      font-size: 1.5rem
      color: #000
      margin-bottom: .5rem

  .card-content
    display: flex
    flex-direction: column
    gap: 1.5rem

  .identity
    position: fixed
    top: .5rem
    right: .5rem
    display: flex
    align-items: center
    gap: .5rem
    padding: .5rem
    color: #000
    text-decoration: none
    border-radius: .5rem
    transition: all .2s ease

    &:hover
      background-color: #eee

    img
      width: 1.75rem
      height: 1.75rem
      pointer-events: none
      user-select: none
</style>
