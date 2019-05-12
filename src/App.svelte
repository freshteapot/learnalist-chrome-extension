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
  import ListEditV1 from "./list.edit.v1.svelte";
  import ListEditV2 from "./list.edit.v2.svelte";
  import ListViewV1 from "./list.view.v1.svelte";
  import ListViewV2 from "./list.view.v2.svelte";

  const options = {
    version: ApiVersion,
    options: ScreenOptions,
    "labels:by:me": LabelsByMe,
    "label:view": LabelView,
    "label:new": LabelAdd,
    "lists:by:me": ListsByMe,
    "alist:new": ListAdd,
    "alist:edit:v1": ListEditV1,
    "alist:edit:v2": ListEditV2,
    "alist:view:v1": ListViewV1,
    "alist:view:v2": ListViewV2
  };
</script>

<Menu />
<svelte:component this={options[$renderScreen]} />
