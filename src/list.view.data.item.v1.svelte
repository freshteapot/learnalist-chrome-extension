<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let item = "";
</script>
<span>{item}</span>
