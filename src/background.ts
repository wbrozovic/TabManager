
const organizeButton = document.getElementById('group-button');
organizeButton?.addEventListener('click', async () => {
    await sortTabs()
});

const unGroupButton = document.getElementById('ungroup-button');
unGroupButton?.addEventListener('click', async () => {
   await unGroupTabs(); 
});

async function unGroupTabs() {
    const groups = await chrome.tabs.query({});
    const ids = groups.map((tab) => tab.id)

    if (ids != undefined) {
        //@ts-ignore
        const ungroup = await chrome.tabs.ungroup(ids)
    }
}

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
            let urlMatch = tab.url?.match('(https:\/\/){1}(www\.)?[a-zA-Z0-9-]+(\.com|\.decisions|\.ryan|\.)');
            //@ts-ignore
            let url:string = urlMatch?.length > 0 ? urlMatch[0] : tab.url;
            console.log(tab)
            url = url.replace('www.', '');
            url = url.replace('https://', '');
            url = url.replace('.com', '');
            url = url.replace('.', '')
            
            if(tab.id) {
                if(tabMap[url]) {
                    tabMap[url].push(tab.id)
                } else {
                    tabMap[url] = [tab.id]
                }
            }
        })   
    )
    console.table(tabMap)

    Object.keys(tabMap).forEach(async (key)  => {
        
        if (key.includes('/')) return;

        const group = await chrome.tabs.group({ tabIds: tabMap[key] })
        const key_lower = key.toLowerCase();
        
        if (key_lower.includes('dev01')) {
            await chrome.tabGroups.update(group, {
              title: 'DEV',
              color: 'green',
            });
        } else if (key_lower.includes('dev02')) {
            await chrome.tabGroups.update(group, {
              title: 'QA',
              color: 'yellow',
            });
        } else if (key_lower.includes('dev03')) {
            await chrome.tabGroups.update(group, {
              title: 'STAGE',
              color: 'orange',
            });
        } 
        else if (key_lower.includes('ryandecisions')) {
            await chrome.tabGroups.update(group, {
              title: 'PROD',
              color: 'red',
            });
        } else if (key_lower.includes('ryantest')) {
            await chrome.tabGroups.update(group, {
              title: 'TEST',
              color: 'blue',
            });
        } else if (key_lower.includes('access-stagingryan')) {
            await chrome.tabGroups.update(group, {
              title: 'DXP STAGE',
              color: 'cyan',
            });
        } else {
            await chrome.tabGroups.update(group, {
                title: key,
                //color: 'red',
              });
        }
        chrome.tabGroups.update(group, {
            collapsed: true,
        })
        
    })
}


