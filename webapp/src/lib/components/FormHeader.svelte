<script>
    let {
        prefix,
        pagerForm = $bindable(),
        functions
    } = $props()
</script>

<div id="formheader" class="{prefix.color}">
    <div class="flex-row-space tb-margin">
        <div class="flex-row">
            <input type="number" bind:value={pagerForm.id_from}>
            <div style="font-size: 22pt">-</div>
            <input type="number" bind:value={pagerForm.id_to}>
            <button class="styled" onclick={functions.refreshPage}>Refresh</button>
        </div>
        <div class="flex-row">
            <button class="styled" tabindex="-1" onclick={functions.prevPage}>Prev Page</button>
            <button class="styled" tabindex="-1" onclick={functions.nextPage}>Next Page</button>
        </div>
    </div>
    <div class="flex-row-space tb-margin">
        <div class="flex-row">
            <button class="styled" tabindex="-1" onclick={functions.duplicateDown}>Duplicate Down</button>
            <button class="styled" tabindex="-1" onclick={functions.duplicateUp}>Duplicate Up</button>
            <button class="styled" tabindex="-1" onclick={functions.gotoNext}>Next</button>
            <button class="styled" tabindex="-1" onclick={functions.gotoPrev}>Previous</button>
            <button class="styled" tabindex="-1" onclick={functions.copy}>Copy</button>
            <button class="styled" tabindex="-1" onclick={functions.paste}>Paste</button>
        </div>
        <div class="flex-row">
            <button class="styled" tabindex="-1" onclick={functions.saveAll}>Save All</button>
        </div>
    </div>
</div>

<style>
    #formheader {
        position: sticky;
        top: 0;
        padding-bottom: 0.25rem;
        border-bottom: solid 1px #000000;
        background-color: #ffffff;
        z-index: 100;
    }
</style>