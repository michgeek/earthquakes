import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

/**
 * @see https://www.npmjs.com/package/vue2-google-maps
 */
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAlV3sKOTaFCE08JR1pr-_4607xt9ZqcBQ',
        libraries: 'places',
    }
});