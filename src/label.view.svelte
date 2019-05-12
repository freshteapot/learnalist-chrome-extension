<script>
  import { onDestroy } from "svelte";
  import { router, promise, label } from "./router.js";
  let message;
  let hasBeenRemoved = false;
  let current;
  const unsubscribe = label.subscribe(value => {
    current = value;
  });

  onDestroy(unsubscribe);

  function clearMessage() {
    message = null;
  }

  async function deleteLabel() {
    let response = await label.delete();
    if (response.status === 404) {
      hasBeenRemoved = true;
    }
    if (response.status === 200) {
      hasBeenRemoved = true;
    }

    message = response.body.message;
  }
</script>

{#if message}
  <div
    class="nicebox"
    on:click={() => clearMessage()}
    title="Click to dismiss.">
    <span>message: {message}</span>
  </div>
{/if}

{#if !hasBeenRemoved}
  <div class="nicebox">
    <button on:click={deleteLabel}>Delete label</button>
  </div>

  <div class="nicebox">
    {#if $promise}
      {#await $promise}
        <p>Looking for lists with the label {current}.</p>
      {:then lists}
        <p>Lists with the label {current}.</p>
        <ul>
          {#each lists as aList (aList)}
            <li>
              <span>{aList.info.title}</span>
            </li>
          {/each}
        </ul>
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    {/if}
  </div>
{/if}
