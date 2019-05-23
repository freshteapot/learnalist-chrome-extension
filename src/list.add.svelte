<script>
  import { router, aList } from "./router.js";
  let title = "";
  let listTypes = ["v1", "v2", "v4"];
  let selected;
  let message;

  function clearMessage() {
    message = null;
  }

  async function handleSubmit() {
    if (title == "") {
      message = "Title cant be empty.";
      return;
    }
    let response = await aList.create(title, selected);
    if (response.status === 201) {
      router.showScreenListEdit(response.body);
    } else {
      message = response.body.message;
    }
  }
</script>

{#if message}
<div on:click={() => clearMessage() } title="Click to dismiss.">
  <span>message: {message}</span>
</div>
{/if}

<div class="nicebox">
  <span>Add</span>
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Title" bind:value={title} />
    <br />
    <span>Which list type?</span>
    <br />
    <select bind:value={selected}>
      {#each listTypes as listType}
        <option value={listType}>{listType}</option>
      {/each}
    </select>
    <button type="submit">Submit</button>
  </form>
</div>
