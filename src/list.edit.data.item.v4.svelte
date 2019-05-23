<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let item = {
    content: "",
    url: ""
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      dispatch("message", {
        action: "newDataItem"
      });
    }
  }
</script>
<textarea type="text" placeholder="Content" bind:value={item.content} on:onkeypress={handleKeyDown}/>
<input type="text" placeholder="Url" bind:value={item.url} on:onkeypress={handleKeyDown}/>

<style>
  textarea {
    width: 300px;
    height: 50px;
  }
  input {
    width: 300px;
    height: 15px;
  }
</style>
