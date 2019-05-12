<script>
  import { router } from "./router.js";
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

<div>
  <button on:click={router.showScreenListsByMe}>My Lists</button>
  <button on:click={router.showScreenLabelsByMe}>My Labels</button>
  <span>/</span>
  <button on:click={router.showScreenListNew}>New List</button>
  <button on:click={router.showScreenLabelNew}>New Label</button>
  <span>/</span>
  <button on:click={router.showScreenOptions}>Options</button>
  <button on:click={router.showScreenVersion}>Version</button>
</div>
