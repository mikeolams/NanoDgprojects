/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined and not empty', function() {
            // expect(allFeeds.forEach(function(){console.log(3)})).not.toBeDefined(3);
            expect(definedCount == allFeeds.length).toBe(true);
            // expect(emptyCount).toBe(0);
            expect(urlStatus).toBe("url is defined");
            // expect(urlIsNotEmpty).toBeDefined("");
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined and not empty', function() {
            expect(feedNameSet).toBeDefined();
            expect(nameStatus).toBe("name is defined");
        });
    });
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        let menuIconhidden = document.querySelector("body");
        it('Menu element is hidden by default', function() {
            expect(menuIconhidden.classList.contains("menu-hidden")).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Menu changes visibility when clicked', function() {
            menuIcon = document.querySelector(".menu-icon-link");
            menuIcon.click();
            expect(menuIconhidden.classList.contains("menu-hidden")).not.toBe(true);
            menuIcon.click();
            expect(menuIconhidden.classList.contains("menu-hidden")).toBe(true);
        });
    })
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
            // done();
        });
        it('Atleast a single element in the feed container after loadfeed()', function() {
            let entryContainer = document.querySelector(".feed"),
                entriesLen = entryContainer.children.length;
            expect(entriesLen > 0).toBe(true);
            // done();
        });
         })
        /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         let entryContainer = document.querySelector(".feed");
         gh = [];
         gj =[];

         beforeEach(function(done) {
        //     loadFeed(0,function(a,done){loadFeed(1, done);
        //     console.log(entryContainer.children[0]);
        // });


        // function asynchronous(callbackOne, callbackTwo){
        //     this.callbackOne = loadfeed(0);
        //     console.log(entryContainer.children[0]);
        //     this.callbackTwo = loadfeed(1, done);
        //     console.log(entryContainer.children[0]);

        // }

            loadFeed(0, function() {
   // this function gets executed once loadFeed(0) has recevied a data and
   // put them into DOM 
   // console.log(entryContainer.children[0]);
   for(item of entryContainer.children){gh.push(item.innerText)};
            console.log(gh);
   loadFeed(1, function (){
       // code in here gets executed once loadFeed(1) has received data
        // console.log(entryContainer.children[0]);
        for(item of entryContainer.children){
                    gj.push(item.innerText);  
         };
          done();
             console.log(gj);
       
   })
})
            // console.log(entryContainer.children[0]);
            // for(item of entryContainer.children){gh.push(item.innerText)};
            // console.log(gh);
             // loadFeed(1, done);
             // console.log(entryContainer.children[0]);
        //      setTimeout(() => {for(item of entryContainer.children){
        //             gj.push(item.innerText);
        //             console.log(gj); 
        //     };
        //      // console.log(gj);  
        // }, 3000);
           
            // done();
        });


        it('New feed content changes', function() {
            // let entryContainer = document.querySelector(".feed");
            expect(gh[0] == gj[0]).not.toBe(true);
        });
    })
}());