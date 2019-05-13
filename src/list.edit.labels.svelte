<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let labels;

  function remove(index) {
    dispatch("message", {
      action: "removeLabel",
      index: index
    });
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      dispatch("message", {
        action: "addLabel",
        item: ""
      });
    }
  }
</script>

{#if labels && labels.length > 0 }
<div class="nicebox">
  <p>Labels</p>
  <ul>
    {#each labels as item, i}
      <li>
        <input type="text" bind:value={item} on:keydown={handleKeyDown}/>
        <span on:click={() => remove(i)}>x</span>
      </li>
    {/each}
  </ul>
</div>
{/if}
