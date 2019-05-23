<script>
  import { onDestroy } from "svelte";
  import { router, aList } from "./router.js";
  import { isObjectEmpty } from "./utils.js";
  import MessageBox from "./messagebox.svelte";
  import ItemV1 from "./list.view.data.item.v1.svelte";
  import ItemV2 from "./list.view.data.item.v2.svelte";

  let feedback;
  let title;
  let labels = [];
  let data = [];
  let listType;
  let hasBeenRemoved = false;

  const unsubscribe = aList.subscribe(value => {
    if (isObjectEmpty(value)) {
      title = undefined;
      labels = undefined;
      data = undefined;
      hasBeenRemoved = true;
      listType = undefined;
      return;
    }

    title = $aList.info.title;
    labels = $aList.info.labels;
    data = $aList.data;
    listType = $aList.info.type;
  });

  onDestroy(unsubscribe);

  const onClickEditList = () => {
    router.showScreenListEdit($aList);
  };

  // TODO duplicate code from list.edit.svelte
  async function onClickDeleteList() {
    let response = await aList.delete();
    if (response.status === 404) {
      hasBeenRemoved = true;
    }
    if (response.status === 200) {
      hasBeenRemoved = true;
    }
    feedback = response.body.message;
  }

  let items = {
    v1: ItemV1,
    v2: ItemV2
  };
  let renderItem = items[listType];
</script>

<MessageBox feedback={feedback} />

{#if !hasBeenRemoved}
<div class="nicebox">
  <button on:click={onClickEditList}>Edit list</button>
  <button on:click={onClickDeleteList}>Delete list</button>
</div>

<div class="nicebox">
  <h1>{title}</h1>
</div>

{#if labels.length > 0 }
<div class="nicebox">
  <p>Labels</p>
  <ul>
    {#each labels as item}
      <li>
        <span>{item}</span>
      </li>
    {/each}
  </ul>
</div>
{/if}

{#if data.length > 0 }
<div class="nicebox">
    <p>Data</p>
    <ul>
      {#each data as item}
        <li>
          <svelte:component this={renderItem} bind:item={item}/>
        </li>
      {/each}
    </ul>
</div>
{/if}
{/if}
