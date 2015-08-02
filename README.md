# Selenium Query Library


__Brings known jQuery-alike API to the WebDriver__

---

As the WebDriver methods are **async**, `Selenium Query` inherits also a `Promise` so you can chain the function calls. A very basic example

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

##### &#9776;
- [`constructor`](#constructor)
- Traverse
	- [`find`](#find)
	- [`filter`](#filter)
	- [`children`](#children)
	- [`parent`](#parent)
	- [`closest`](#closest)
- Attributes
	- [`attr`](#attr)
	- [`html`](#html)
	- [`text`](#text)
	- [`prop`](#prop)
	- [`val`](#val)
- Class
	- [`hasClass`](#hasClass)
	- [`addClass`](#addClass)
	- [`removeAttr`](#removeAttr)
	- [`toggleClass`](#toggleClass)



###### `constructor( WebDriver | WebElement | Array<WebElement> | SQuery | Array<SQuery> )` <a name='constructor'>#</a>

- [WebDriver](http://selenium.googlecode.com/git/docs/api/javascript/module_selenium-webdriver_class_WebDriver.html)
- [WebElement](http://selenium.googlecode.com/git/docs/api/javascript/class_webdriver_WebElement.html)

```javascript
var SQuery = require('selenium-query');
var $elements = SQuery(driver);
var $inputs = $elements.find('inputs');
```