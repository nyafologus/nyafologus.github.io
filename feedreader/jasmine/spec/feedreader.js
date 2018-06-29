/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(() => {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined and not empty', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Tests that loops through each feed in the
         * allFeeds object and ensures it has a URL
         * defined and that the URL is not empty.
         */
        it('have their URLs defined and not empty', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);                
            });
        });

        /* Tests that loops through each feed in the 
         * allFeeds object and ensures it has a name
         * defined and that the name is not empty.
         */
        it('have their names defined and not empty', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);                
            });
        });
    });

    /* Test suite for "The menu" */
    describe('The menu', () => {
        /* Ensures the menu element is hidden by default.
         * You'll have to analyze the HTML and the
         * CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Ensures the menu changes visibility when the
          * menu icon is clicked. This test should have
          * two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when it is clicked', () => {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite for "Initial Entries" */
    describe('Initial Entries', () => {
        /* Ensures when the loadFeed function is called and
         * completes its work, there is at least a single .entry
         * element within the .feed container. Remember, loadFeed()
         * is asynchronous so this test will require the use of
         * Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });

        it('ensure that Feed is not empty initially', () => {
            expect($('.entry .feed')).toBeDefined();
        });
    });

    /* Test suite for changes in "New Feed Selection" */
    describe('New Feed Selection', () => {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feedSelection1;
        let feedSelection2; 
        
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, () => {                  
                feedSelection1 = $('.feed').find(allFeeds.url);
                done();
            });
            loadFeed(1, () => {
                feedSelection2 = $('.feed').find(allFeeds.url);
                done();
            });
        });

        it('should be different from the previous selection of feeds', () => {
            expect(feedSelection1).not.toBe(feedSelection2);
        });
    });
});