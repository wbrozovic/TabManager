
const organizeButton = document.getElementById('group-button');
organizeButton?.addEventListener('click', async () => {
    await sortTabs()
})

/*
Hashmap
key: baseUrl
val: [tabId]
*/

interface ITabMap {
    [url:string] : [number];
}




const tabMap: ITabMap = {}

async function sortTabs() {
    const tabs = await chrome.tabs.query({
        url: [
            "https://*/*"
        ]
    }).then((tabs) => 
        tabs.forEach((tab: chrome.tabs.Tab) => {
            //@ts-ignore
            let url:string = tab.url?.match('https:\/\/[a-zA-Z0-9]+')[0]
            
            if(tab.id) {
                if(tabMap[url]) {
                    tabMap[url].push(tab.id)
                } else {
                    tabMap[url] = [tab.id]
                }
            }
        })
        
    )
    
    
}


