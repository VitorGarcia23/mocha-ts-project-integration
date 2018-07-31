# Project for Unit Testing with mocha and typescript

This is a base project for **integration** tests for REST APIs using node.js
The objective of this project is to provide a structured code that meets the need of a Quality Assurance Team on a daily basis.

## Structure

* **TestResult/reports** : folder that will contain all the tests results in an html file. The name pattern is **tests${date_time}**.

* **tests** : folder that contains all the strucure of the project.

* **tests/commons**: contains all files and functions that will be shared in all tests. Ex:API base URL

* **tests/config**: framework config files. Ex: mocha and prepare configuration.

* **tests/libs**: specific libraries that contain the abstraction of proccesses that the test does not need to execute like a request.

* **tests/suite**: contain the actual tests

* **tests/suite/{route}**: containe the necessary data to execute tests (dataset.ts), the route tests(test.ts) and support functions ({route}.test.ts)

## Notes

* All test files must be inside a folder(with the route name by convention of the project) and the file must be named **[file-name].tests.ts**
* All the data-set files, by convention, must be inside their respective routes and be named **dataset.ts**
* The report files are generated in **HTML format** and are created inside **report folder** on the root of the project.

## Running Tests

Execute the following command or config a new one on **package.json** scripts.

```
yarn run tests
```
- Flags to be passed:
    - '--file fileName' or '-F fileName' where fileName is the name of the test file to run (* is the default value).
    - '--path folderPath' or '-P folderPath' where folderName is the name of the folder where the test files are (suite is the default value).
    - '--Test testPattern' or '-T testPattern' where testPattern is the 'name or pattern' of the test you wanna run.
    - '--env environment' or '-E environment' where the valid envs are 'dev,stg,prd'.

# Mocha and Chai

- For information on the Mocha (Hooks and other information) access https://mochajs.org/ 

- For reference on how to assert look at http://www.chaijs.com/api/bdd/