const pdfjs = require('./pdf.min');
const _ = require('lodash');
const http = require('http');

const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const pdfURL = 'http://eurestcafes.compass-usa.com/walmart/DiningMenus/DGTC%20Menu.pdf';

pdfjs.PDFJS.getDocument(pdfURL)
    .then((pdf) => {
        return pdf.getPage(1);
    })
    .then((page) => {
        return page.getTextContent();
    })
    .then((text) => {
        let items = _.cloneDeep(text.items);
        const found = _.findIndex(items, (item) => {
            return item.str.includes('Mac-N-Cheeselogy');
        });

        items = items.slice(found);
        let foundDay = null;
        const day = _.find(items, (item, index) => {
            if (index === 15) {
                console.log('here');
            }
            _.each(weekdays, (day) => {
                if (_.toLower(item.str).includes(day)) {
                    foundDay = day;
                }
            });
            return foundDay;
        });

        if (found) {
            console.log('Found Mac & Cheese!');
        }
        else {
            console.log('Did not find Mac & Cheese :(');
        }
    })
    .catch((err) => {
        console.log(err);
    });
