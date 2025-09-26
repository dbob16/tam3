<script>
    import { browser } from "$app/environment";
    import hotkeys from "hotkeys-js";

    let {
        prefix,
        pagerForm = $bindable(),
        functions
    } = $props()

    if (browser) {
        hotkeys.filter = function(event) {return true}
        hotkeys('alt+n', function(event) {event.preventDefault(); functions.nextPage(); return false});
        hotkeys('alt+b', function(event) {event.preventDefault(); functions.prevPage(); return false});
        hotkeys('alt+j', function(event) {event.preventDefault(); functions.duplicateDown(); return false});
        hotkeys('alt+u', function(event) {event.preventDefault(); functions.duplicateUp(); return false});
        hotkeys('alt+l', function(event) {event.preventDefault(); functions.gotoNext(); return false});
        hotkeys('alt+o', function(event) {event.preventDefault(); functions.gotoPrev(); return false});
        hotkeys('alt+c', function(event) {event.preventDefault(); functions.copy(); return false});
        hotkeys('alt+v', function(event) {event.preventDefault(); functions.paste(); return false});
        hotkeys('alt+s', function(event) {event.preventDefault(); functions.saveAll(); return false});
    }
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
            <button class="styled" title="Alt + B" tabindex="-1" onclick={functions.prevPage}>Prev Page</button>
            <button class="styled" title="Alt + N" tabindex="-1" onclick={functions.nextPage}>Next Page</button>
        </div>
    </div>
    <div class="flex-row-space tb-margin">
        <div class="flex-row">
            <button class="styled" title="Alt + J" tabindex="-1" onclick={functions.duplicateDown}>Duplicate Down</button>
            <button class="styled" title="Alt + U" tabindex="-1" onclick={functions.duplicateUp}>Duplicate Up</button>
            <button class="styled" title="Alt + L" tabindex="-1" onclick={functions.gotoNext}>Next</button>
            <button class="styled" title="Alt + O" tabindex="-1" onclick={functions.gotoPrev}>Previous</button>
            <button class="styled" title="Alt + C" tabindex="-1" onclick={functions.copy}>Copy</button>
            <button class="styled" title="Alt + V" tabindex="-1" onclick={functions.paste}>Paste</button>
        </div>
        <div class="flex-row">
            <button class="styled" title="Alt + S" tabindex="-1" onclick={functions.saveAll}>Save All</button>
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