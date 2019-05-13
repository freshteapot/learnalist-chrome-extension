<script>
  import { onDestroy } from "svelte";
  import { router, aList } from "./router.js";
  import ItemV1 from "./list.view.data.item.v1.svelte";
  import ItemV2 from "./list.view.data.item.v2.svelte";

  let title;
  let labels = [];
  let data = [];
  let listType;
  const unsubscribe = aList.subscribe(value => {
    title = $aList.info.title;
    labels = $aList.info.labels;
    data = $aList.data;
    listType = $aList.info.type;
  });

  onDestroy(unsubscribe);

  const onClick = () => {
    router.showScreenListEdit($aList);
  };

  let items = {
    v1: ItemV1,
    v2: ItemV2
  };
  let renderItem = items[listType];
</script>

<div class="nicebox">
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
          <svelte:component this={renderItem} bind:item={item}/>
        </li>
      {/each}
    </ul>
</div>
{/if}
