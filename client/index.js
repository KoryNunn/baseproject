var fastn = require('./fastn');
var blazon = require('blazon');
var { Maybe, Cast } = blazon;

var model = new fastn.Model({
    errors: {}
});

var maybeNumber = blazon(Maybe(Cast(Number), 0));

function setFromEvent(errorModel, type, event){
    var fieldName = event.target.previousSibling.textContent;
    try {
        this.value(type(event.target.value));
        errorModel.remove('error');
    } catch (error) {
        errorModel.set('error', error.message.match(/(Expected .*?),/)[1]);
    }
}

function validation(type, callback){
    var errorModel = new fastn.Model();
    var fieldLabel;

    var errorField = fastn('div', { class: 'error' }, fastn.binding('error')).attach(errorModel);

    function setValue(event){
        setFromEvent.call(this, errorModel, type, event);
    }

    return callback(setValue, errorField);
}

var ui = fastn('div', { class: 'content' },
    fastn('span', { class: 'madeBy' }, 'Made by', fastn('a', { href: 'https://korynunn.com' }, 'Kory Nunn')),
    fastn('h1', { class: 'pageHeading' }, 'An evolving no-frills base project so I can build stuff quickly'),
    fastn('section',
        fastn('h2', 'Intended for quick prototypes. Not a "best practice" example.')
    ),
    validation(maybeNumber, (set, errorField) => fastn('field',
        fastn('label', 'Example field with validation'),
        fastn('input', {
            placeholder: 'Type numbers',
            value: fastn.binding('number')
        })
        .on('input', set),
        errorField
    ))
)
.attach(model)
.render();

window.addEventListener('load', () => document.body.appendChild(ui.element));
