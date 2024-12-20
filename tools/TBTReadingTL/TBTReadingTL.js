// TBTReadingTL.js
(function() {
    try {
        // Define elements to exclude from link counting (header and footer)
        var excludeElements = ['header', 'footer'];

        // Function to calculate reading time based on average reading speed (200 words per minute)
        var calculateReadingTime = function(text) {
            // Split the text into words and count them
            var words = text.split(/\s+/).length;
            // Calculate the reading time in minutes
            var minutes = words / 200;
            // Return the rounded-up reading time
            return Math.ceil(minutes);
        };

        // Function to count links on the page
        var countLinks = function() {
            // Select all links (anchor tags) on the page
            var allLinks = document.querySelectorAll('a');
            // Check if there are any links
            if (allLinks.length > 0) {
                var excludeLinks = [];
                // Loop through the exclude elements and find links within them
                excludeElements.forEach(function(element) {
                    var links = document.querySelectorAll(element + ' a');
                    links.forEach(function(link) {
                        excludeLinks.push(link);
                    });
                });
                // Filter out the excluded links from the total links
                var filteredLinks = Array.from(allLinks).filter(function(link) {
                    return !excludeLinks.includes(link);
                });
                return {
                    // Total number of links excluding those in header and footer
                    total: filteredLinks.length,
                    // Number of offsite links (links with a different hostname)
                    offsite: filteredLinks.filter(function(link) {
                        return link.hostname !== location.hostname;
                    }).length
                };
            } else {
                // Log an error if no links are found
                console.error('No links found on the page.');
                return { total: 0, offsite: 0 };
            }
        };

        // Get the visible text content from the body of the page
        var visibleText = document.body.innerText;

        // Calculate the reading time based on the visible text
        var readingTime = calculateReadingTime(visibleText);

        // Count the links on the page
        var linkCounts = countLinks();

        // Calculate the percentage of offsite links
        var offsitePercentage = (linkCounts.offsite / linkCounts.total) * 100;

        // Display the result in an alert dialog
        alert(
            'Reading Time: ' + readingTime + ' minute(s)\n' +
            'Count of Links: ' + linkCounts.total + '\n' +
            'Percentage of Offsite Links: ' + offsitePercentage.toFixed(2) + '%\n\n' +
            'Research by TheBlindTrust.org \n' +
            'github.com/TBT-gh/SWOT/tools/TBTReadingTL'
        );
    } catch (e) {
        // Log any errors that occur during execution
        console.error('Error: ' + e.message);
    }
})();
