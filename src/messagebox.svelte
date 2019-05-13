<script>
  export let feedback = null;

  function dismiss() {
    feedback = null;
  }
</script>

{#if feedback}
<div class="nicebox" on:click={dismiss} title="Click to dismiss.">
  <span>message: {feedback}</span>
</div>
{/if}
