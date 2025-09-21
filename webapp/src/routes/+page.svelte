<script>
  let prefix_name = $state("");
</script>

<div class="main-menu">
  <h1>TAM3 - Main Menu</h1>
  <div class="prefix-selector">
    <select bind:value={prefix_name}></select>
  </div>
  <div class="form-buttons">
    <a href="/tickets/" class="button">Tickets</a>
    <a href="/baskets/" class="button">Baskets</a>
    <a href="/drawing/" class="button">Drawing</a>
  </div>
  <button>Test</button>
</div>

<style>
  .prefix-selector select {
    width: 100%;
  }
</style>
