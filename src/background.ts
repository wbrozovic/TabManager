
const organizeButton = document.getElementById('group-button');
organizeButton?.addEventListener('click', () => {
    console.log('Organized')
})

//@ts-ignore
const tabs = await chrome.tabs.query({
    url: [
        "https://*/*"
    ]
});

function sortTabs() {
    let sortedTabList_temp: chrome.tabs.Tab[] = []
    let tabDict = {}

    

}


