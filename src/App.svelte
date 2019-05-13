<script>
  import { renderScreen } from "./router.js";
  import Menu from "./menu.svelte";
  import ScreenOptions from "./options.svelte";
  import ApiVersion from "./version.svelte";
  import LabelsByMe from "./labels.by.me.svelte";
  import LabelAdd from "./label.add.svelte";
  import LabelView from "./label.view.svelte";

  import ListsByMe from "./lists.by.me.svelte";
  import ListAdd from "./list.add.svelte";
  import ListEdit from "./list.edit.svelte";
  import ListView from "./list.view.svelte";

  const options = {
    version: ApiVersion,
    options: ScreenOptions,
    "labels:by:me": LabelsByMe,
    "label:view": LabelView,
    "label:new": LabelAdd,
    "lists:by:me": ListsByMe,
    "alist:new": ListAdd,
    "alist:edit": ListEdit,
    "alist:view": ListView
  };
</script>

<Menu />
<svelte:component this={options[$renderScreen]} />
