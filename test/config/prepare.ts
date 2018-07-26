/**
 * This file is called before the test framework is loaded
 * If you need to execute something once before all tests you can use this file
 * Like a setup of the environment
 * Also you can use it for a global Teardown
 */

suiteSetup(() => {
    console.log('execute anything before running any tests');
});

suiteTeardown(() => {
    console.log('execute anything after running all tests');
});
