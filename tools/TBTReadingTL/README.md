# TBTReadingTL
This bookmarklet calculates the reading time, counts the links, and calculates the percentage of offsite links on a webpage, excluding header and footer links.

## Usage - github hosted snippet - this mostly won't work due to CORS!
1. Create a bookmark in your browser.
2. Set the URL of the bookmark to the following code:
```javascript
javascript:(function() {
    var script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/TBT-gh/SWOT/main/tools/TBTReadingTL/TBTReadingTL.js';
    document.body.appendChild(script);
})();
```
## Usage - inline bookmarklet
1. Create a bookmark in your browser.
2. Set the URL of the bookmark to the following code:
```javascript
javascript:(function() {
    // Inline script content from TBTReadingTL.js
    try {
        var excludeElements = ['header', 'footer'];
        var calculateReadingTime = function(text) {
            var words = text.split(/\s+/).length;
            var minutes = words / 200;
            return Math.ceil(minutes);
        };
        var countLinks = function() {
            var allLinks = document.querySelectorAll('a');
            if (allLinks.length > 0) {
                var excludeLinks = [];
                excludeElements.forEach(function(element) {
                    var links = document.querySelectorAll(element + ' a');
                    links.forEach(function(link) {
                        excludeLinks.push(link);
                    });
                });
                var filteredLinks = Array.from(allLinks).filter(function(link) {
                    return !excludeLinks.includes(link);
                });
                return {
                    total: filteredLinks.length,
                    offsite: filteredLinks.filter(function(link) {
                        return link.hostname !== location.hostname;
                    }).length
                };
            } else {
                console.error('No links found on the page.');
                return { total: 0, offsite: 0 };
            }
        };
        var visibleText = document.body.innerText;
        var readingTime = calculateReadingTime(visibleText);
        var linkCounts = countLinks();
        var offsitePercentage = (linkCounts.offsite / linkCounts.total) * 100;
        alert(
            'Reading Time: ' + readingTime + ' minute(s)\n' +
            'Count of Links: ' + linkCounts.total + '\n' +
            'Percentage of Offsite Links: ' + offsitePercentage.toFixed(2) + '%\n\n' +
            'Research by TheBlindTrust.org \n' +
            'github.com/TBT-gh/SWOT/tools/TBTReadingTL'
        );
    } catch (e) {
        console.error('Error: ' + e.message);
    }
})();
