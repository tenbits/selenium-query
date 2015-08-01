# Selenium Query Library


__Brings known jQuery-alike API to the WebDriver__

---

As the WebDriver methods are **async**, so each method returns a Promise which is also chainable. A very basic example

```javascript
var $ = require('selenium-query');
$(driver)
	.find('.foo')
	.filter('input')
	.attr('placeholder', 'Baz')
	.val()
	.then(value => console.log(value));
```

## API

#### `constructor( WebDriver | WebElement | Array<WebElement> | SQuery | Array<SQuery> )`

- [WebDriver](http://selenium.googlecode.com/git/docs/api/javascript/module_selenium-webdriver_class_WebDriver.html)
- [WebElement](http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebElement.html)

```javascript
var SQuery = require('selenium-query');
var $elements = $(driver);
var $inputs = $elements.find('inputs');
```