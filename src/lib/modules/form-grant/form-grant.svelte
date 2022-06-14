<script lang="ts">
  import { goto } from '$app/navigation';
  import { FormGrant } from '$lib/components/forms';
  import { grantAccess } from '.';

  export let code: string;

  const grantTypes = [
    {
      value: '10s',
      label: 'Permitir dessa vez',
    },
    {
      value: '24h',
      label: 'Permitir esse IP por 24 horas',
    },
    {
      value: '10y',
      label: 'Sempre permitir esse IP',
    },
  ];
  let value = '10s';

  const handleSubmit = async () => {
    const granted = await grantAccess(code, value);
    goto(granted ? '/success' : '/fail');
  };
</script>

<FormGrant on:submit={handleSubmit} {grantTypes} bind:value />
