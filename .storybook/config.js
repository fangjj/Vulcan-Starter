import { addDecorator, configure } from '@storybook/react';

/*

Standard Config

*/
// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

/*

React Router Config
See https://github.com/gvaldambrini/storybook-router/tree/master/packages/react

*/
import StoryRouter from 'storybook-react-router';
addDecorator(StoryRouter());

/*

Components

*/

// load UI components
import 'UIComponentsLoader';
// load core components
import 'CoreComponentsLoader';

/*

i18n

See https://github.com/truffls/storybook-addon-intl

*/

import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addLocaleData } from 'react-intl';
import { Strings, Locales } from './helpers.js';

const getMessages = locale => Strings[locale];

/*

En

*/
import enLocaleData from 'react-intl/locale-data/en';
addLocaleData(enLocaleData);
import 'EnUS';

// Set intl configuration
setIntlConfig({
  locales: Locales.map(locale => locale.id),
  defaultLocale: 'en',
  getMessages,
});

// Register decorator
addDecorator(withIntl);

// Run storybook
configure(loadStories, module);
