<script>
    import { browser } from "$app/environment";

    let upload_file = $state();
    let contents = $state("");
    let results = $state("");

    function setResult(new_result) {
        results = new_result;
        setTimeout(() => results = "", 10000);
    }

    async function downloadBackupFile(target) {
        let fetch_url;
        if (target === "local") {
            fetch_url = "/api/backuprestore/local";
        } else if (target === "remote") {
            fetch_url = "/api/backuprestore"
        };
        const now = new Date()
        const date = {
            year: now.getFullYear(),
            month: String(now.getMonth()+1).padStart(2, '0'),
            day: String(now.getDate()).padStart(2, '0'),
            hour: String(now.getHours()).padStart(2, '0'),
            minutes: String(now.getMinutes()).padStart(2, '0')
        }
        const res = await fetch(fetch_url);
        if (res.ok) {
            const data = await res.json();
            const jsonString = JSON.stringify(data); // Pretty print JSON
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `TAM3_${date.year}-${date.month}-${date.day} ${date.hour}-${date.minutes}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
    async function fileUpload() {
        const reader = new FileReader();
        reader.readAsText(upload_file[0], 'utf-8');
        reader.onload = function(e) {
            contents = String(e.target.result)
        };
        setTimeout(() => {
            fetch('/api/backuprestore', {body: contents, method: 'POST', headers: {'Content-Type': 'application/json'}})
                .then(() => {setResult("File was sent. Check to see if your data exists now.")})
                .catch(() => {setResult("Error sending file.")})
        }, 100)
    }
    if (browser) {
        document.title = "TAM3 - Backup and Restore"
    }
</script>

<h1>TAM3 Backup and Restore</h1>
<div>
    <h2>Backup</h2>
    <div class="flex-row">
        <button class="styled" onclick={() => downloadBackupFile("remote")}>Download Backup from Remote (if setup)</button>
        <button class="styled" onclick={() => downloadBackupFile("local")}>Download Backup from Local Only</button>
    </div>
</div>
<div>
    <h2>Restore</h2>
    <div class="flex-row">
        <input type="file" accept=".json" bind:files={upload_file}>
        <button class="styled" onclick={fileUpload}>Upload</button>
    </div>
</div>
<div>
    {results}
</div>