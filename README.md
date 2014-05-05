pageboy.js
==========

[![Build Status](https://travis-ci.org/iainjmitchell/pageboy.js.png)](https://travis-ci.org/iainjmitchell/pageboy.js)

Simple javascript Domain Specific Language (DSL) for interaction with browser.

It is based upon [Capybara's](https://github.com/jnicklas/capybara) DSL, which is used by some in Ruby's Cucumber BDD framework.  The idea of **pageboy.js** is to make interactions with the browser as easy to read as possible, with the original attention to improve the readability of unit tests that interact with the DOM.

So say we want to programatically click a button on a page, using jQuery we'd just do the following...

```javascript
$('#aButtonId').click();
```

...but with **pageboy.js** we have the click_button() function, which can take either the button ID OR the button label text. 

```javascript
clickButton('aButtonId');
```

It may seem a bit odd to have different calls for clicking of buttons and other controls (e.g. links), but the idea is to make the intent as clear as possible for the reader.

##DSL reference

###clicking

| Command | HTML elements targeted |
| --- | --- | 
| clickLink(*'id-of-anchor'*); | anchor |
| clickLink(*'text-of-anchor'*); | anchor |
| clickButton(*'id-of-button'*); | button, input[type=button] |
| clickButton(*'text-on-button'*); | button, input[type=button] |

###interacting with forms

| Command | HTML elements targeted |
| --- | --- | 
| fillIn(*'id-of-element'*); | input[type=text], input[type=password], textarea |
| fillIn(*'label-for-of-element'*); | input[type=text], input[type=password], textarea |
| check(*'id-of-checkbox'*); | input[type=checkbox] |
| uncheck(*'id-of-checkbox'*); | input[type=checkbox] |



