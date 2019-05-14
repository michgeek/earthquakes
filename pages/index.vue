<template>
    <GmapMap :center="{lat:10, lng:10}" :zoom="2" map-type-id="terrain" style="width: 100vw; height: 100vh">
        <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" v-on:click="selectMarker(m)"/>
        <gmap-info-window :options="markerInfoOptions"
                          :position="selected.position"
                          :opened="shouldShowMarkerInfo" v-on:closeclick="unselectMarker">
            <h1>{{ selected.title }}</h1>
            <ul>
                <li>Place: {{ selected.place }}</li>
                <li>Date: {{ selected.date }}</li>
                <li>Magnitude: {{ 1.4 }}</li>
                <li><a :href="selected.url">More details...</a></li>
            </ul>
        </gmap-info-window>
    </GmapMap>
</template>
<script>
    const EARTHQUAKES_24H_ENDPOINT = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

    export default {
        mounted() {
            fetch(EARTHQUAKES_24H_ENDPOINT)
                .then((response) => response.json().then((data) => this.feed = data))
                .catch((err) => {
                    alert('Unable to load earthquakes');
                    console.log(err);
                });
        },
        data() {
            return {
                markerInfoOptions: {pixelOffset: {width: 0, height: -35}}, // Some spacing for the marker info popup
                feed: null, // The 24h feed containing the most recent earthquakes
                selected: null // Currently selected marker
            };
        },
        methods: {
            selectMarker(marker) {
                this.selected = marker;
            },
            unselectMarker() {
                this.selected = null;
            }
        },
        computed: {
            earthquakes() {
                // Always returns an [] (consistent/null object pattern)
                return this.feed && this.feed.hasOwnProperty('features') ? this.feed.features : [];
            },
            markers() {
                return this.earthquakes.map(({properties, geometry}) => {
                    return {
                        ...properties,
                        date: new Date(properties.time).toUTCString(),
                        position: {
                            lng: geometry.coordinates[0],
                            lat: geometry.coordinates[1],
                        }
                    };
                });
            },
            shouldShowMarkerInfo() {
                return this.selected ? true : false;
            }
        }
    }
</script>