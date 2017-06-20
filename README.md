# Selenium Query and Manipulation Library

[![Build Status](https://travis-ci.org/tenbits/selenium-query.png?branch=master)](https://travis-ci.org/tenbits/selenium-query)
[![NPM version](https://badge.fury.io/js/selenium-query.svg)](http://badge.fury.io/js/selenium-query)

**jQuery-alike API for [Selenium WebDriver](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html)**

---

### Asynchronous nature

As the WebDriver methods are **async**, `Selenium Query` instance implements `Promise` and you can chain the function calls. A very basic example

```javascript
var $ = require('selenium-query');
$(driver)
    .find('.foo')
    .filter('input')
    .attr('placeholder', 'Baz')
    .val()
    .then(value => console.log(value));
```

### Extension methods

As with jQuery you can define an extension method and call it in your tests

```javascript
var $ = require('selenium-query');
$.fn.doBaz = function(){
    return this.each(el => {
        // do some usefull things with WebElement
    });
};
$(driver)
	.find('input')
	.doBaz();
```

## API

##### &#9776;
- [`constructor`](#constructor)
- [Collection](#collection)
	- [`length`](#length)
	- [`eq`](#eq)
	- [`slice`](#slice)
	- [`each`](#each)
	- [`map`](#map)
	- [`toArray`](#toArray)
- [Traverse](#traverse)
	- [`find`](#find)
	- [`filter`](#filter)
	- [`children`](#children)
	- [`parent`](#parent)
	- [`closest`](#closest)
- [Attributes](#attributes)
	- [`attr`](#attr)
	- [`removeAttr`](#removeAttr)
	- [`prop`](#prop)
	- [`removeProp`](#removeProp)
	- [`val`](#val)
	- [`css`](#css)
- [Class](#class)
	- [`hasClass`](#hasClass)
	- [`addClass`](#addClass)
	- [`removeClass`](#removeAttr)
	- [`toggleClass`](#toggleClass)
- [Manipulate](#manipulate)
	- [`remove`](#remove)
- [Dimension and Position](#dimensions)
	- [`height`](#height)
	- [`width`](#width)
	- [`innerHeight`](#innerHeight)
	- [`innerWidth`](#innerWidth)
	- [`offset`](#offset)
	- [`position`](#position)
	- [`scrollTop`](#scrollTop)
	- [`scrollLeft`](#scrollLeft)
- [Content](#content)
	- [`html`](#html)
	- [`text`](#text)
	- [`append`](#append)
	- [`prepend`](#prepend)
	- [`before`](#before)
	- [`after`](#after)
- [Events](#events)
	- [`trigger`](#trigger)
	- [`click`](#click)
	- [`change`](#change)
	- [`focus`](#focus)
	- [`blur`](#blur)
	- :sparkles: [`type`](#type)
	- :sparkles: [`press`](#press)
	- :sparkles: [`sendKeys`](#sendKeys)
	- :sparkles: [`select`](#select)

- [Misc](#misc)
	- [`eval`](#eval)

- [Document](#document)
	- [`load`](#load)
	- [`getDriver`](#getDriver)
	- [`setDriver`](#setDriver)


##### `constructor(WebDriver|WebElement|Array<WebElement>|SQuery|Array<SQuery>)` <a name='constructor'></a>

- [WebDriver](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html)
- [WebElement](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html)

```javascript
var SQuery = require('selenium-query');
var $document = SQuery(driver);
var $inputs = $document.find('inputs');
```

## Collection

##### `length:number` <a name='length'></a>
Count of WebElements in a current set.
> :exclamation: Due to asynchronous nature, sometimes you have to wait until the promise is resolved to get the correct `length` value

##### `eq(index:number):SQuery` <a name='eq'></a>
Get the SQuery instance with only one element at the index.
> :exclamation: Once again, wait until the promise is resolved, or **chain** the manipulations
```javascript
$(driver)
    .find('button')
    .eq(0)
    .css('background-color', 'red')
    .done(() => console.log('The color has been changed.'))
// instead of an equivalent
$(driver)
    .find('button')
    .done(buttons => {
        buttons
            .eq(0)
            .done(firstButton => {
                firstButton
                    .css('background-color', 'red')
                    .done(() => console.log('The color has been changed.'))
            })
    });
```

##### `slice([start:number = 0, end:number = .length]):SQuery` <a name='slice'></a>
Get elements range.

##### `each(function<node:WebElement, index:number, Promise|void 0>):SQuery` <a name='each'></a>
Enumerate the collection. The callback function can return a promise, if an async job is performed.

##### `map(function<node:WebElement, index:number, Promise|any>):SQuery` <a name='map'></a>
Map the collection into the new one. Return the value from the function or a promise which resolves then with the value.

##### `toArray():Promise<Array<any>>` <a name='toarray'></a>
Returns a promise which resolves with an Array instance of current elements in collection


## Traverse

##### `find(selector:string):SQuery` <a name='find'></a>
Find element(s).

##### `filter(selector:string):SQuery` <a name='filter'></a>
Filter element(s) out of the current collection.

##### `children([selector:string]):SQuery` <a name='children'></a>
Get, and optionally filter, children of every element in the collection.

##### `parent():SQuery` <a name='parent'></a>
Get parent elements of every element in the collection

##### `closest(selector):SQuery` <a name='closest'></a>
Find ancestor of every element in the collection


## Attributes

##### `attr(key:string | key:string, val:any | attributes:Object ):SQuery|Promise<any>` <a name='attr'></a>
Get attribute value of the first element in the collection, or set attribute(s) to each element.

##### `removeAttr(key:string):SQuery` <a name='removeAttr'></a>
Remove the attribute

##### `prop(key:string | key:string, val:any | properties:Object):SQuery|Promise<any>` <a name='prop'></a>
Get property value of the first element in the collection, or set property(ies) to each element.

##### `removeProp(key:string):SQuery` <a name='removeProp'></a>
Delete property

##### `val([value:string]):SQuery` <a name='val'></a>
Get or set `value` property, like `input.value`

##### `css(key:string | key:string, val:string | css:Object ):SQuery|Promise<any>` <a name='css'></a>
Get or set style properties

## Class

##### `hasClass(name:string):Promise<boolean>` <a name='hasClass'></a>
Check if the first element has the class name.

##### `addClass(name:string):SQuery` <a name='addClass'></a>
Add the class name(s) to every element in the collection

##### `removeClass(name:string):SQuery` <a name='removeClass'></a>
Remove the class name(s) of every element in the collection

##### `toggleClass(name:string):SQuery` <a name='toggleClass'></a>
Toggle the class name(s) of every element in the collection

## Manipulate

##### `remove():SQuery` <a name='remove'></a>
Remove the elements from the parent nodes

## Dimensions

##### `height():Promise<number>` <a name='height'></a>
##### `width():Promise<number>` <a name='width'></a>
##### `innerHeight():Promise<number>` <a name='innerHeight'></a>
##### `innerWidth():Promise<number>` <a name='innerWidth'></a>
##### `offset():Promise<object{top,left}>` <a name='offset'></a>
##### `position():Promise<object{top,left}>` <a name='position'></a>
##### `scrollTop():Promise<number>` <a name='scrollTop'></a>
##### `scrollLeft():Promise<number>` <a name='scrollLeft'></a>

## Content

##### `html([html:string]):SQuery|Promise<string>` <a name='html'></a>
##### `text([text:string]):SQuery|Promise<string>` <a name='text'></a>

##### `append(html:string):SQuery` <a name='append'></a>
##### `prepend(html:string):SQuery` <a name='prepend'></a>
##### `before(html:string):SQuery` <a name='before'></a>
##### `after(html:string):SQuery` <a name='after'></a>

## Events

##### `trigger(type:string [, data:Object]):SQuery` <a name='trigger'></a>
Trigger native or custom event.

##### `click():SQuery` <a name='click'></a>
##### `change():SQuery` <a name='change'></a>
Trigger `change` event
##### `focus():SQuery` <a name='click'></a>
##### `blur():SQuery` <a name='click'></a>

##### `type(text:string):SQuery` <a name='type'></a>
Enter the text.
> :exclamation: Meta keys are supported in `{}`

##### `press(combination:string):SQuery` <a name='press'></a>
Press key combination. E.g.: `ctrl+c`, `a+b+c`, `ctrl+alt+d`, `ctrl++` _(`control` and `plus` keys)_

##### `sendKeys(text:string):SQuery` <a name='sendKeys'></a>
Call native Selenums `sendKeys` fn on each element

##### `select(text:string | start:number[, end:number]):SQuery` <a name='select'></a>
Select an option from the `select` element, or if the `input` the selects a text or range


## Misc

##### `eval(fn:Function, ...args):Promise<any>` <a name='eval'></a>
Evaluate function in Browser.
> :exclamation: The first argument is the first element in the set
```javascript
$(driver)
	.find('button')
	.eval(function(el){
		// browser context
		// do smth. with the Element and return a value
	});
```


## Document

#### `static` `load(url:string[, config:WebDriverOptions]):SQuery` <a name='load'></a>
Create or reuse a WebDriver, and load the page.

#### `WebDriverOptions` defaults
```javascript
{
	name: 'Chrome',
	args: ['no-sandbox'],
	binaryPath: null,

	// For better control and to change the behaviour of how the options are created and applied,
	// you can define next functions
	applyOptions: function(builder, options) {},
	setOptions (builder, options) {},
	setArguments (options) {},
	setBinaryPath (options) {},
	setLogging (options) {}
}
```

**Example**
```javascript
SQuery
	.load('http://google.com')
	.find('input')
	.css('background-color', 'red');
```


:checkered_flag:

---

:copyright: MIT, Alex Kit
