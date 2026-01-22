<script>
    let formData = $state({ startNumber: 0, endNumber: 0, perPage: 20 });
    let currentRows = $state([]);

    function selectOnFocus(e) {
        e.target.select();
    }

    function loadRows() {
        currentRows = ["Loading"]
        setTimeout(() => {
          currentRows = [];
          for (let i = formData.startNumber; i <= formData.endNumber; i++) {
              currentRows = [...currentRows, i];
          }
        }, 1)
    }
</script>

<svelte:head>
    <title>Print Ticket Sheets</title>
</svelte:head>

<div id="header">
    <h1>Print Ticket Sheets</h1>
    <div class="flex-row-space">
        <div class="flex-row">
            <div>
                <div>Start Number</div>
                <input
                    type="number"
                    onfocus={selectOnFocus}
                    bind:value={formData.startNumber}
                />
            </div>
            <div>
                <div>Ending Number</div>
                <input
                    type="number"
                    onfocus={selectOnFocus}
                    bind:value={formData.endNumber}
                />
            </div>
            <div>
                <div>Per Page</div>
                <input
                    type="number"
                    onfocus={selectOnFocus}
                    bind:value={formData.perPage}
                />
            </div>
            <div>
                <button class="styled" onclick={loadRows}>Load</button>
            </div>
        </div>
        <div class="flex-row">
            <button class="styled" onclick={() => window.print()}>Print</button>
        </div>
    </div>
</div>

<table id="main_table">
    <colgroup>
        <col style="width: 15%" />
        <col style="width: 40%" />
        <col style="width: 35%" />
        <col style="width: 10%" />
    </colgroup>
    <thead>
        <tr>
            <th>Ticket #</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Text?</th>
        </tr>
    </thead>
    <tbody style="height: 100%">
        {#each currentRows as row, idx}
            {#if idx !== 0 && idx % formData.perPage === 0}
                <tr class="pagebreak"></tr>
            {/if}
            <tr>
                <td><strong>{row}</strong></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    #main_table {
        width: 100%;
        height: 100%;
        text-align: left;
        table-layout: fixed;
        th,
        td {
            border: solid black 1px;
            white-space: nowrap;
            overflow: hidden;
        }
    }

    @media print {
        #header {
            display: none;
        }

        #main_table {
            table-layout: fixed;
        }

        #main_table tbody {
            font-size: 16pt;
        }

        #main_table tbody tr {
            height: 32pt;
        }

        #main_table tbody tr.pagebreak {
            break-after: page;
        }

        @page:after {
            content: "My Text";
        }
    }
</style>
