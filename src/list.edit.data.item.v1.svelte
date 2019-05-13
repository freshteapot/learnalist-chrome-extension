<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let item = "";

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      dispatch("message", {
        action: "newDataItem"
      });
    }
  }
</script>
<input type="text" bind:value={item} on:onkeypress={handleKeyDown}/>
