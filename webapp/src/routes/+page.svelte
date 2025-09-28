<script>
  import { browser } from "$app/environment";
  import { env } from "$env/dynamic/public";
  import hotkeys from "hotkeys-js";
  import favicon from "$lib/assets/favicon.svg"

  let { data } = $props();
  let prefix_name = $state("");
  let all_prefixes = $state([]);
  let current_prefix = $state({name: "", color: "", weight: 0});
  let admin_mode = $state(false);
  const venue = env.PUBLIC_TAM3_VENUE || "TAM3";

  $effect(() => {
    const new_prefix = all_prefixes.find((prefix) => prefix.name === prefix_name);
    if (new_prefix) {
      current_prefix = {...new_prefix};
    }
  })
  
  if (browser) {
    all_prefixes = [...data.prefixes];
    document.title = `${venue} - Main Menu`;
    hotkeys.filter = function(event) {return true};
    hotkeys('alt+a', function(event) {event.preventDefault(); admin_mode = !admin_mode; return false;});
    setTimeout(() => {
      if (all_prefixes[0]) {
        prefix_name = all_prefixes[0].name;
      }
    }, 100);
  };
</script>

<div class="main-menu">
  <div class="flex-row">
    <img src="{favicon}" alt="TAM3 Icon - Red ticket with TAM3 on it" class="icon">
    <h1>{venue} - Main Menu</h1>
  </div>
  <div class="universal-reports flex-row tb-margin">
    <a href="/counts" target="_blank" class="styled">Counts</a>
  </div>
  <div>
    <h2>Select Prefix:</h2>
  </div>
  <div class="prefix-selector">
    <select style="width: 100%; box-sizing: border-box;" bind:value={prefix_name}>
      {#each all_prefixes as prefix}
      <option value={prefix.name}>{prefix.name}</option>
      {/each}
    </select>
  </div>
  <div><h2>Forms:</h2></div>
  <div class="flex-row {current_prefix.color}">
    <a href="/tickets/{current_prefix.name}/" target="_blank" class="styled">Tickets</a>
    <a href="/baskets/{current_prefix.name}/" target="_blank" class="styled">Baskets</a>
    <a href="/drawing/{current_prefix.name}/" target="_blank" class="styled">Drawing</a>
  </div>
  <div><h2>Reports:</h2></div>
  <div class="flex-row {current_prefix.color}">
    <a href="/reports/byname/{current_prefix.name}/" target="_blank" class="styled">By Name</a>
    <a href="/reports/bybasket/{current_prefix.name}/" target="_blank" class="styled">By Basket ID</a>
  </div>
  {#if admin_mode}
  <div><h2>Admin Mode:</h2></div>
  <div class="flex-row {current_prefix.color}">
    <a href="/prefixes" target="_blank" class="styled">Prefix Editor</a>
  </div>
  {/if}
</div>

<div class="annotation">
  <p>Ticket Auction Manager 3 by Dilan Gilluly</p>
</div>

<style>
  img.icon {
    max-width: 150px;
  }
</style>
