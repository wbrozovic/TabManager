
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
            let url:string = tab.url?.match('(https:\/\/){1}(www\.)?[a-zA-Z0-9]+')[0]
            
            url = url.replace('www.', '');
            url = url.replace('https://', '')

            if(tab.id) {
                if(tabMap[url]) {
                    tabMap[url].push(tab.id)
                } else {
                    tabMap[url] = [tab.id]
                }
            }
        })
        
    )
    
    tabMap.map((key:string) => {
        console.log(key)
    })

    //const group = await chrome.tabs.group({tabMap})
    //console.log(group)
}


