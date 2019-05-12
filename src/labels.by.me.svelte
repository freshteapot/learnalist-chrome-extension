<script>
  import { router, promise } from "./router.js";

  const onClick = label => () => {
    router.showScreenLabelView(label);
  };
</script>
<div class="nicebox">
{#if $promise}
  {#await $promise}
    <p>...waiting</p>
  {:then labels}
    <ul>
      {#each labels as label}
        <li>
          <span on:click={onClick(label)}>{label}</span>
        </li>
      {/each}
    </ul>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}
</div>
