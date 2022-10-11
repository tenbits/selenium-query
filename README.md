# Web Query and Manipulation Library

<p align='center'>
    <img src='assets/background.jpg'/>
</p>

----

[![Build Status](https://app.travis-ci.com/tenbits/selenium-query.svg?branch=master)](https://app.travis-ci.com/github/tenbits/selenium-query)
[![NPM version](https://badge.fury.io/js/selenium-query.svg)](http://badge.fury.io/js/selenium-query)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

#### jQuery-alike API for [Selenium WebDriver](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html), [JSDom](https://github.com/jsdom/jsdom) and [Cheerio](https://github.com/cheeriojs/cheerio)


Single API to query web-pages or html blocks with supported providers: `Selenium WebDriver`, `JSDom`, `Cheerio`, `Plain-HTTP`.

> Use for tests, crawlers and automations.

---

## Request

> All cookies received from the backend will be reused for a domain.

```typescript
import SQuery from 'selenium-query';
let $ = await SQuery.load(url, config?: IConfig)
```


## Query and Manipulate

### Asynchronous nature

As the WebDriver methods are **async**, `Selenium Query` instance implements `Promise` and you can chain the function calls or use `async/await`. A very basic example

```typescript
import $ from 'selenium-query';

$(driver)
    .find('.foo')
    .filter('input')
    .attr('placeholder', 'Baz')
    .val()
    .then(value => console.log(value));

// or via await
let value = await $(driver).find('input.foo').val();
console.log(value);
```

### Extension methods

As with jQuery you can define an extension method and call it in your tests

```typescript
import $ from 'selenium-query';

$.fn.doBaz = function(){
    return this.each(el => {
        // do some usefull things with WebElement/JsDomElement/CherioElement
    });
};
$(driver)
    .find('input')
    .doBaz();
```

### WebDriver network monitor

> Allows to get and to listen for events emitted by the browser

```typescript
import { BrowserNetworkMonitor  } from 'selenium-query';

let monitor = await BrowserNetworkMonitor.start(driver);

monitor
    .on('requestWillBeSent', req => console.log(req))
    .on('responseReceived', req => console.log(req))
    .on('loadingFinished', req => console.log(req));

// ... e.g. after the a page is loaded
let { request, response } = monitor.getRequest(/index.html/);
console.log(request.headers, response.headers);

// get the response body
let { base64Encoded, body } = monitor.getResponseBody(mainPageRequest);
```

### WebDriver network interceptor

> Allows to send custom responses for requests back to the browser

```typescript
import { BrowserNetworkInterceptor  } from 'selenium-query';

let interceptor = await BrowserNetworkInterceptor.start(driver);
interceptor.register({
    match: /index.html/,
    response: {
        status: 200,
        headers: {
            'Content-Type': 'text/html'
        },
        body: '<!DOCTYPE html> <h1>Changed</h1>'
    }
});
// ... load index.html, and the modified content should be loaded
```

### Pseudo selectors

##### `:text` and improved `:has` selectors

```typescript
let html = `
    <ul>
        <li name='x'>Foo <span id='foo'></span></li>
        <li name='y'>Bar <span id='bar'></span></li>
    </ul>
`;
SQuery.pseudo.isBar = async ($el, innerQuery) => {
    let $children = await $el.find('#bar');
    return $children.length > 0;
};

let value1 = await $.find('li:text(Bar)').attr('name');
let value2 = await $.find('li:has(span#id)').attr('name');
let value3 = await $.find('li:isBar()').attr('name');
// value1 === value2 === value3 === 'y'

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

- :zap: [JsDom](#jsdom)
    - [`build`](#jsdom-build)
    - [`load`](#jsdom-load)

- :zap: [Cheerio](#cheerio)
    - [`build`](#cheerio-build)
    - [`load`](#cheerio-load)

- :zap: [Network](#network)
    - [`load`](#network-load)


##### `constructor(WebDriver|WebElement|Array<WebElement>|SQuery|Array<SQuery>)` <a name='constructor'></a>

- [WebDriver](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html)
- [WebElement](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html)

```typescript
let SQuery = require('selenium-query');
let $document = SQuery(driver);
let $inputs = $document.find('inputs');
```

## Collection

##### `length:number` <a name='length'></a>
Count of WebElements in a current set.
> :exclamation: Due to asynchronous nature, sometimes you have to wait until the promise is resolved to get the correct `length` value

##### `eq(index:number):SQuery` <a name='eq'></a>
Get the SQuery instance with only one element at the index.
> :exclamation: Once again, wait until the promise is resolved, or **chain** the manipulations
```typescript
await $(driver)
    .find('button')
    .eq(0)
    .css('background-color', 'red')
// instead of an equivalent

let buttons = await $(driver).find('button')
let firstButton = await buttons.eq(0);

await firstButton.css('background-color', 'red');
console.log('The color has been changed.'));

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
```typescript
let result = await $(driver)
    .find('button')
    .eval((el: HTMLButton) => {
        // browser context
        // do smth. with the Element and return a value
      return el.tagName;
    });
```


## Document

#### `static` `load(url:string[, config:WebDriverOptions]):SQuery` <a name='load'></a>
Create or reuse a WebDriver, and load the page.

#### `WebDriverOptions` defaults
```typescript
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

## JsDom

#### `static` `SQuery.jsdom.build(config: IJsdomParams):SQuery` <a name='jsdom-build'></a>

```typescript
interface IJsdomParams {
    html: string
}
```

Create SQuery collection with JsDom driver

#### `static` `SQuery.jsdom.load(url: string, config: IJsdomLoadParams):SQuery` <a name='jsdom-load'></a>

```typescript
interface IJsdomLoadParams {
    headers?: {[name: string] : string }
    method?
    query?: {[name: string] : string }
    payload?
    cookies?: string | string[]
    cache?: {
        folder?: string
        maxAge?: number
    }
    cacheQueryIgnore?: string[]
    /** Webdriver will load this url, or requested url, to set the cookies first */
    cookieOrigin?: string
}
```

## Cheerio

#### `static` `SQuery.cheerio.build(config: ICheerioParams):SQuery` <a name='cheerio-build'></a>

```typescript
interface ICheerioParams {
    html: string
}
```

Create SQuery collection with Cheerio driver (_Only query and manipulation methods are implemented_)

#### `static` `SQuery.cheerio.load(url: string, config: ICheerioLoadParams):SQuery` <a name='cheerio-load'></a>

```typescript
interface ICheerioLoadParams {
    headers?: {[name: string] : string }
    method?
    query?: {[name: string] : string }
    payload?
    cookies?: string | string[]
    cache?: {
        folder?: string
        maxAge?: number
    }
    cacheQueryIgnore?: string[]
    /** Webdriver will load this url, or requested url, to set the cookies first */
    cookieOrigin?: string
}
```



## Network

HTTP Utils to load and submit data. Handles cache and cookies.

#### `load` `SQuery.network.load(url: string, config: IHttpParams):IHttpResponse` <a name='network-load'></a>

```typescript
interface IHttpParams {
    headers?: {[name: string] : string }
    method?: 'post' | 'get' | 'delete' | 'patch' | 'head' | string
    query?: {[name: string] : string }
    body?: string | Buffer

    cookies?: {[name: string] : string } | string[] | string
    cookiesDefault?: {[name: string] : string } | string[] | string

    cache?: boolean | {
        folder?: string
        maxAge?: number
        compress?: boolean
        //-ensureCacheAllowed? (resp): boolean
    }
    cacheQueryIgnore?: string[]

    retryCount?: number
    retryTimeout?: number
    follow?: number
    httpsProxy?: string
    ignoreSSLErrors?: boolean
}
interface IHttpResponse {
    status: number
    message?: string

    headers: {[name: string] : string }
    url: string
    body: any
}
```


**Example**
```typescript
$
    .load('http://google.com')
    .find('input')
    .css('background-color', 'red');
```



## Known "features"

> This version of ChromeDriver only supports Chrome version XYZ

Means the installed version of the Chromedriver is not compatible with Chrome itself. Usually it doesn't required one-to-one version, means you can use v97 of the chrome driver, with Chrome v98.

All platforms: Download the required Chromedriver from https://chromedriver.chromium.org/downloads

Windows: `choco upgrade chromedriver`


> Stale element not found

When creating HTML DOM Elements in Chrome, make sure they are attached to the `DOM` before returning them to the `nodejs` process.

:checkered_flag:

---

:copyright: MIT, Alex Kit
