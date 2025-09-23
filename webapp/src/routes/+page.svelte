<script>
  import { browser } from "$app/environment";

  let { data } = $props();
  let prefix_name = $state("");
  let all_prefixes = $state([]);
  let current_prefix = $state({name: "", color: "", weight: 0})

  $effect(() => {
    const new_prefix = all_prefixes.find((prefix) => prefix.name === prefix_name);
    if (new_prefix) {
      current_prefix = {...new_prefix};
    }
  })
  
  if (browser) {
    all_prefixes = [...data.prefixes];
    document.title = "TAM3 - Main Menu"
  };
</script>

<div class="main-menu">
  <h1>TAM3 - Main Menu</h1>
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
</div>

<style>
  .prefix-selector select {
    width: 100%;
  }
</style>
