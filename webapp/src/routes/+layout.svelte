<script>
  import favicon from "$lib/assets/favicon.svg";
  import "$lib/css/main.css";
  import "$lib/css/colors.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
