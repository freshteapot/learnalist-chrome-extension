<script>
  import { config } from "./config.js";
  import { router, promise } from "./router.js";
  let errorMessage = "";
  let options = {
    server: localStorage.getItem("server") ? localStorage.getItem("server") : "",
    username: localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "",
    password: ""
  };

  function save() {
    errorMessage = "";
    if (options.server !== "") {
      console.log("Should we ping the /version?");
    }
    if (options.username !== "" && options.password !== "") {
      let basicAuth = btoa(options.username + ":" + options.password);
      localStorage.setItem("username", options.username);
      localStorage.setItem("basicAuth", basicAuth);
      localStorage.removeItem("bearerAuth");
    } else {
      errorMessage = "You need to set a username and password";
      console.log(errorMessage);

      localStorage.setItem("username", "");
      localStorage.setItem("basicAuth", "");
      localStorage.removeItem("bearerAuth");
      return false;
    }
    localStorage.setItem("server", options.server);
    router.showScreenListsByMe();
  }
  function reset() {
    console.log("reset");
    localStorage.setItem("username", "");
    localStorage.setItem("basicAuth", "");
    localStorage.removeItem("bearerAuth");
    localStorage.removeItem("server");
  }
</script>

<style>
  .error {
    color: #ff0000;
  }
</style>

{#if errorMessage !== ''}
  <div class="nicebox">
    <h2 class="error">{errorMessage}</h2>
  </div>
{/if}
<div class="nicebox">
  <label for="f-server">Server</label>
  <input style="width: 100%;" type="text" name="f-server" bind:value={options.server} placeholder="https://learnalist.net/api" />

  <label for="f-username">Username</label>
  <input style="width: 100%; " type="text" name="f-username" bind:value={options.username} />
  <label for="f-password">Password</label>
  <input style="width: 100%;" type="password" name="f-password" bind:value={options.password} />
</div>

<div class="nicebox">
  <button on:click={save}>Save</button>
  <button on:click={reset}>reset / clear / delete</button>
</div>
