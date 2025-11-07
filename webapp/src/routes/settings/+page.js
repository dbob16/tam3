export async function load({ fetch }) {
    const res = await fetch('/api/settings');
    const settingsData = await res.json();
    return {settings: settingsData};
}