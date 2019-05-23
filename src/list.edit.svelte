<script>
  import { onDestroy } from "svelte";
  // TODO remove router
  // TODO can I change aList to store/alist?
  import { router, aList } from "./router.js";
  import { isObjectEmpty } from "./utils.js";
  import ListEditLabels from "./list.edit.labels.svelte";
  import ListEditData from "./list.edit.data.svelte";
  import MessageBox from "./messagebox.svelte";

  let feedback;
  let title;
  let labels = [];
  let data = [];
  let hasBeenRemoved = false;
  let listType;
  const unsubscribe = aList.subscribe(value => {
    if (isObjectEmpty(value)) {
      title = undefined;
      labels = undefined;
      data = undefined;
      hasBeenRemoved = true;
      listType = undefined;
      return;
    }
    title = value.info.title;
    listType = value.info.type;
    labels = value.info.labels;
    data = value.data;
  });

  onDestroy(unsubscribe);

  function viewList() {
    router.showScreenListView($aList);
  }

  async function save() {
    feedback = await aList.save();
  }

  async function deleteList() {
    let response = await aList.delete();
    if (response.status === 404) {
      hasBeenRemoved = true;
    }
    if (response.status === 200) {
      hasBeenRemoved = true;
    }
    feedback = response.body.message;
  }

  function setTitle(event) {
    aList.setTitle(event.target.value);
  }

  function newDataItem() {
    aList.newDataItem($aList.info.type);
  }

  function removeDataItem(index) {
    aList.removeItem(index);
  }

  function addLabel() {
    aList.addLabel("");
    // TODO focus on the next new line
  }

  function removeLabel(index) {
    aList.removeLabel(index);
  }

  function handleMessage(event) {
    if (event.detail.action === "addLabel") {
      addLabel();
    } else if (event.detail.action === "removeLabel") {
      removeLabel(event.detail.index);
    } else if (event.detail.action === "newDataItem") {
      newDataItem();
    } else if (event.detail.action === "removeDataItem") {
      removeDataItem(event.detail.index);
    }
  }
</script>

<MessageBox feedback={feedback} />

{#if !hasBeenRemoved}
<div class="nicebox">
  <span>Title:</span>
  <input type="text" value={title} on:keyup={setTitle}/>
</div>

<div class="nicebox">
  <button on:click={newDataItem}>+ item</button>
  <button on:click={addLabel}>+ label</button>
</div>

<ListEditLabels on:message={handleMessage} bind:labels={labels} />
<ListEditData on:message={handleMessage} bind:data={data} listType={listType}/>

<div class="nicebox">
  <button on:click={save}>save</button>
  <button on:click={deleteList}>Delete</button>
  <button on:click={viewList}>Cancel</button>
</div>
{/if}
