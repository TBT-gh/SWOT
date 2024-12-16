# TBTReadingTL
This bookmarklet calculates the reading time, counts the links, and calculates the percentage of offsite links on a webpage, excluding header and footer links.

## Usage
1. Create a bookmark in your browser.
2. Set the URL of the bookmark to the following code:
```javascript
javascript:(function() {
    var script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/TBT-gh/SWOT/main/tools/TBTReadingTL/TBTReadingTL.js';
    document.body.appendChild(script);
})();
