<script>
  import { router, promise } from "./router.js";

  const onClick = aList => () => {
    // TODO fix this in the backend.
    if (aList.info.labels === undefined) {
      aList.info.labels = [];
    }
    router.showScreenListView(aList);
  };
</script>
<div class="nicebox">
{#if $promise}
  {#await $promise}
    <p>...waiting</p>
  {:then lists}
    <ul>
      {#each lists as aList (aList)}
        <li>
          <span on:click={onClick(aList)}>{aList.info.title} .</span>
        </li>
      {/each}
    </ul>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}
</div>
