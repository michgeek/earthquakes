<template>
    <GmapMap :center="{lat:10, lng:10}" :zoom="2" map-type-id="terrain" style="width: 100vw; height: 100vh">
        <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" v-on:click="selected = m"/>
        <gmap-info-window v-if="selected"
                          :options="{pixelOffset: {width: 0,height: -35}}"
                          :position="selected.position"
                          :opened="selected ? true : false" v-on:closeclick="selected=null">
            <h1>{{ selected.title }}</h1>
            <ul>
                <li>Place: {{ selected.place }}</li>
                <li>Time: {{ selected.time }} TZ: {{ selected.tz }}</li>
                <li>Magnitude: {{ 1.4 }}</li>
                <li><a :href="selected.url">More details...</a></li>
            </ul>
        </gmap-info-window>
    </GmapMap>
</template>
<script>
    import feed from '../plugins/earthquakes.json';

    export default {
        data() {
            return {
                feed,
                selected: null
            };
        },
        computed: {
            earthquakes() {
                return this.feed.hasOwnProperty('features') ? this.feed.features : [];
            },
            markers() {
                return this.earthquakes.map(({properties, geometry}) => {
                    return {
                        ...properties,
                        position: {
                            lng: geometry.coordinates[0],
                            lat: geometry.coordinates[1],
                        }
                    };
                });
            }
        }
    }
</script>