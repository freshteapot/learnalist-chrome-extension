<script>
  import { router, promise } from "./router.js";
</script>
<div class="nicebox">
<!-- replace this element -->
{#if $promise}
  {#await $promise}
    <p>...waiting</p>
  {:then data}
    <p>Version is {data.version}</p>
    <p>Git hash is {data.gitHash}</p>
    <p>Git date is {data.gitDate}</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}
</div>
