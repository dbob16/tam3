<script>
    import { browser } from "$app/environment";
    import hotkeys from "hotkeys-js";

    let {
        searchForm = $bindable(),
        headerHeight = $bindable(),
        functions,
    } = $props();

    if (browser) {
        hotkeys.filter = function (event) {
            return true;
        };
        hotkeys("alt+n", function (event) {
            event.preventDefault();
            functions.nextPage();
            return false;
        });
        hotkeys("alt+b", function (event) {
            event.preventDefault();
            functions.prevPage();
            return false;
        });
        hotkeys("alt+j", function (event) {
            event.preventDefault();
            functions.duplicateDown();
            return false;
        });
        hotkeys("alt+u", function (event) {
            event.preventDefault();
            functions.duplicateUp();
            return false;
        });
        hotkeys("alt+l", function (event) {
            event.preventDefault();
            functions.gotoNext();
            return false;
        });
        hotkeys("alt+o", function (event) {
            event.preventDefault();
            functions.gotoPrev();
            return false;
        });
        hotkeys("alt+c", function (event) {
            event.preventDefault();
            functions.copy();
            return false;
        });
        hotkeys("alt+v", function (event) {
            event.preventDefault();
            functions.paste();
            return false;
        });
        hotkeys("alt+s", function (event) {
            event.preventDefault();
            functions.saveAll();
            return false;
        });
    }
</script>

<div id="formheader" bind:offsetHeight={headerHeight}>
    <div class="flex-row-space tb-margin">
        <div class="flex-row">
            <div class="column">
                <div>First Name</div>
                <input
                    type="text"
                    style="width: 20ch"
                    bind:value={searchForm.first_name}
                />
            </div>
            <div class="column">
                <div>Last Name</div>
                <input
                    type="text"
                    style="width: 20ch"
                    bind:value={searchForm.last_name}
                />
            </div>
            <div class="column">
                <div>Phone Number</div>
                <input
                    type="text"
                    style="width: 20ch"
                    bind:value={searchForm.phone_number}
                />
            </div>
            <button
                class="styled"
                onclick={() => {
                    if (
                        searchForm.first_name ||
                        searchForm.last_name ||
                        searchForm.phone_number
                    ) {
                        functions.refreshPage();
                    }
                }}>Refresh</button
            >
        </div>
    </div>
    <div class="flex-row-space tb-margin">
        <div class="flex-row">
            <button
                class="styled"
                title="Alt + J"
                tabindex="-1"
                onclick={functions.duplicateDown}>Duplicate Down</button
            >
            <button
                class="styled"
                title="Alt + U"
                tabindex="-1"
                onclick={functions.duplicateUp}>Duplicate Up</button
            >
            <button
                class="styled"
                title="Alt + L"
                tabindex="-1"
                onclick={functions.gotoNext}>Next</button
            >
            <button
                class="styled"
                title="Alt + O"
                tabindex="-1"
                onclick={functions.gotoPrev}>Previous</button
            >
            <button
                class="styled"
                title="Alt + C"
                tabindex="-1"
                onclick={functions.copy}>Copy</button
            >
            <button
                class="styled"
                title="Alt + V"
                tabindex="-1"
                onclick={functions.paste}>Paste</button
            >
        </div>
        <div class="flex-row">
            <button
                class="styled"
                title="Alt + S"
                tabindex="-1"
                onclick={functions.saveAll}>Save All</button
            >
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
