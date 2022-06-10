<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ error, status }) => {
    return {
      props: {
        status,
        message: error?.message,
      },
    };
  };
</script>

<script lang="ts">
  import { WEBSITE_URL } from '$lib/env';
  import { Button } from '$lib/components/button';

  export let status: number, message: string;

  const getErrorDetails = (status: number) => {
    switch (status) {
      case 401:
        return {
          message: 'Não autorizado',
          description:
            'A sua sessão expirou ou é inválida. Tente fazer login novamente ou trocar de conta.',
          showLogout: true,
        };
      case 403:
        return {
          message: 'Não autorizado',
          description:
            'Você não é o proprietário desse usuário. Se acredita no contrário, tente trocar de conta.',
          showLogout: true,
        };
      case 404:
        return {
          message: 'Página não econtrada',
          description:
            'A página que você solicitou não existe, confira se você digitou o link corretamente.',
          showLogout: false,
        };
      case 406:
        return {
          message: 'Código inválido',
          description: 'O código deve ter cinco dígitos alfanuméricos.',
          showLogout: false,
        };
      case 410:
        return {
          message: 'Código expirado',
          description: 'O código informado não existe ou expirou.',
          showLogout: false,
        };
      case 500:
        return {
          message: 'Erro interno do servidor',
          description: `Algo deu errado, por favor reporte ao administrador. ${message}`,
          showLogout: false,
        };
      default:
        return {
          message: 'Erro desconhecido',
          description: `Ocorreu um erro desconhecido, por favor reporte ao administrador. ${message}`,
          showLogout: false,
        };
    }
  };

  const details = getErrorDetails(status);
</script>

<section class="section">
  <div class="error">
    <h1 class="status">{status}</h1>
    <p class="message">{details.message}</p>
    <p class="description">{details.description}</p>
  </div>
  <div class="buttons">
    {#if details.showLogout}
      <Button small primary>Trocar de conta</Button>
    {/if}
    <Button
      small={details.showLogout}
      primary={!details.showLogout}
      href={WEBSITE_URL}>Voltar ao site</Button
    >
  </div>
</section>

<style lang="sass">
  @import '../sass/vars'

  .section
    display: flex
    flex-direction: column
    align-items: center
    text-align: center
    gap: 2rem
    width: 100%
    max-width: 24rem

  .status
    font-size: 3rem
    color: $muted-text
    margin-bottom: -.25rem

  .message
    font-size: 1.2rem
    font-weight: 600
    margin-bottom: .5rem

  .description
    color: $muted-text
  
  .buttons
    display: flex
    justify-content: flex-end
    gap: .75rem
</style>
