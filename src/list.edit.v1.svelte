<script>
  import { onDestroy } from "svelte";
  // TODO remove router
  // TODO can I change aList to store/alist?
  import { router, aList } from "./router.js";
  import { isObjectEmpty } from "./utils.js";

  let message;
  let title;
  let labels = [];
  let data = [];
  let hasBeenRemoved = false;

  const unsubscribe = aList.subscribe(value => {
    if (isObjectEmpty(value)) {
      title = undefined;
      labels = undefined;
      data = undefined;
      hasBeenRemoved = true;
      return;
    }
    title = value.info.title;
    labels = value.info.labels;
    data = value.data;
  });

  onDestroy(unsubscribe);

  function setTitle(event) {
    aList.setTitle(event.target.value);
  }

  function clearMessage() {
    message = null;
  }

  function add() {
    aList.addItem("");
  }

  async function save() {
    message = await aList.save();
  }

  async function deleteList() {
    let response = await aList.delete();
    if (response.status === 404) {
      hasBeenRemoved = true;
    }
    if (response.status === 200) {
      hasBeenRemoved = true;
    }
    message = response.body.message;
  }

  function removeItem(index) {
    aList.removeItem(index);
  }

  function addLabel() {
    aList.addLabel("");
    // TODO focus on the next new line
  }

  function removeLabel(index) {
    aList.removeLabel(index);
  }

  function handleKeyDown(event) {
    debugger;
    if (event.keyCode === 13) {
      addLabel();
      return;
    }
  }
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

{#if message}
<div on:click={() => clearMessage() } title="Click to dismiss.">
  <span>message: {message}</span>
</div>
{/if}

{#if !hasBeenRemoved}
<div>
  <span>Title:</span>
  <input type="text" value={title} on:keyup={setTitle}/>
</div>

<div>
  <button on:click={add}>+ item</button>
  <button on:click={addLabel}>+ label</button>
</div>

{#if labels && labels.length > 0 }
<div>
  <ul>
    {#each labels as item, i}
      <li>
        <input type="text" bind:value={item} on:keydown={handleKeyDown}/>
        <span on:click={() => removeLabel(i)}>x</span>
      </li>
    {/each}
  </ul>
</div>
{/if}

{#if data.length > 0 }
<div>
  <p>Data</p>
  <ul>
    {#each data as item, i}
      <li>
        <input type="text" bind:value={item} />
        <span on:click={() => removeItem(i)}>x</span>
      </li>
    {/each}
  </ul>
</div>
{/if}

<div>
  <button on:click={save}>save</button>
  <button on:click={deleteList}>Delete</button>
</div>
{/if}
