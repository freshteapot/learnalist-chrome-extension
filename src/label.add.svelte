<script>
  import { hasWhiteSpace } from "./utils.js";
  import { router, label } from "./router.js";

  let newLabel = "";
  let message;

  function clearMessage() {
    message = null;
  }

  async function add() {
    if (newLabel === "" || hasWhiteSpace(newLabel)) {
      message = "The label cannot be empty.";
      newLabel = "";
      return;
    }
    let response = await label.save(newLabel);
    if (response.status === 201 || response.status === 200) {
      message = response.body.message;
      router.showScreenLabelView(newLabel);
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
  <p>Add a label</p>
  <input type="text" bind:value={newLabel}/>
  <button on:click={add}>Add</button>
</div>
