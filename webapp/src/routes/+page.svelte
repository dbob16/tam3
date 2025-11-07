<script>
  import { browser } from "$app/environment";
  import { env } from "$env/dynamic/public";
  import hotkeys from "hotkeys-js";
  import favicon from "$lib/assets/favicon.svg"

  let { data } = $props();
  const all_prefixes = [...data.prefixes];
  let prefix_name = $state("");
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
  {#if all_prefixes.length > 0}
  <div class="universal-reports flex-row tb-margin">
    <a href="/counts" target="_blank" class="styled">Counts</a>
  </div>
  <div>
    <h2>Current Prefix: {current_prefix.name}</h2>
  </div>
  <div class="change_title">
    <h2>Change Prefix:</h2>
  </div>
  <div class="prefix-selector flex-row">
    {#each all_prefixes as prefix}
    <div class="{prefix.color} p025{prefix.name === prefix_name ? " active" : ""}">
      <button class="styled" onclick={() => {
        prefix_name = prefix.name;
      }}>{prefix.name}</button>
    </div>
    {/each}
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
  {:else}
  <p>There aren't any prefixes available, please create them.</p>
  {/if}
</div>
{#if admin_mode}
<div><h2>Admin Mode:</h2></div>
  <div class="flex-row">
    <a href="/prefixes" target="_blank" class="styled">Prefix Editor</a>
    <a href="/backuprestore" target="_blank" class="styled">Backup/Restore</a>
    <a href="/settings" target="_blank" class="styled">Settings</a>
</div>
{/if}

<div class="status tb-margin">
  {data.status}
</div>

<div class="annotation">
  <p>Ticket Auction Manager 3 by Dilan Gilluly</p>
</div>

<style>
  img.icon {
    max-width: 150px;
  }
</style>
