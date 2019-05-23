<script>
  import { createEventDispatcher } from "svelte";
  import ItemV1 from "./list.edit.data.item.v1.svelte";
  import ItemV2 from "./list.edit.data.item.v2.svelte";
  import ItemV4 from "./list.edit.data.item.v4.svelte";

  const dispatch = createEventDispatcher();

  export let data;
  export let listType;

  function remove(index) {
    dispatch("message", {
      action: "removeDataItem",
      index: index
    });
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      dispatch("message", {
        action: "newDataItem"
      });
    }
  }
  let items = {
    v1: ItemV1,
    v2: ItemV2,
    v4: ItemV4
  };
  let renderItem = items[listType];
</script>


{#if data.length > 0 }
<div class="nicebox">
  <p>Data</p>
  <ul>
    {#each data as item, i}
    <li>
      <svelte:component this={renderItem} bind:item={item}/>
      <span on:click={() => remove(i)}>x</span>
    </li>
    {/each}
  </ul>
</div>
{/if}
