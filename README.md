// Bold header text
# **TabManager Chrome Extension**
TabManager seeks to organize your tabs of the same website into groups. This is a work in progress that 
essentially uses regex to extract the base of each tab's url and organizes the tabs accordingly.

There are some hard-coded values that are specific to a platform I use at work in backround.ts lines 69-95. These
values are used to separate tabs of different development envs (dev, test, QA, etc) as I frequently have multiple tabs of each env open at once.

# **Future Work**
- [ ] More inteligent tab grouping
- [ ] UI to add known url's to a group that the user wants (to allow a user to achieve the same functionality as the hard-coded values in backround.ts)
- [ ] More customization in general
- [ ] Settings sync accross chrome account
- [ ] UI to allow user to add/remove groups





Following along these tutorials for reference

- https://betterprogramming.pub/creating-chrome-extensions-with-typescript-914873467b65
- https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-tabs-manager/
