<script>
  import { onDestroy } from "svelte";
  import { router, aList } from "./router.js";

  let title;
  let labels = [];
  let data = [];
  const unsubscribe = aList.subscribe(value => {
    title = $aList.info.title;
    labels = $aList.info.labels;
    data = $aList.data;
  });

  onDestroy(unsubscribe);

  const onClick = () => {
    router.showScreenListEdit($aList);
  };
</script>

<style>
  div {
    border: 1px solid #aaa;
    border-radius: 2px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1em;
    margin: 0 0 1em 0;
  }
</style>

<div>
  <button on:click={onClick}>Edit list</button>
</div>

<div class="nicebox">
  <h1>{title}</h1>
</div>

{#if labels.length > 0 }
<div class="nicebox">
  <p>Labels</p>
  <ul>
    {#each labels as item}
      <li>
        <span>{item}</span>
      </li>
    {/each}
  </ul>
</div>
{/if}

{#if data.length > 0 }
<div class="nicebox">
    <p>Data</p>
    <ul>
      {#each data as item}
        <li>
          <span>{item}</span>
        </li>
      {/each}
    </ul>
</div>
{/if}
