<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let item = {
    from: "",
    to: ""
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      dispatch("message", {
        action: "newDataItem"
      });
    }
  }
</script>
<input type="text" bind:value={item.from} on:onkeypress={handleKeyDown}/>
<input type="text" bind:value={item.to} on:onkeypress={handleKeyDown}/>
