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
                <li>Date: {{ selected.date }}</li>
                <li>Magnitude: {{ 1.4 }}</li>
                <li><a :href="selected.url">More details...</a></li>
            </ul>
        </gmap-info-window>
    </GmapMap>
</template>
<script>
    export default {
        mounted() {
            fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
                .then((response) => response.json().then((data) => this.feed = data))
                .catch((err) => {
                    alert('Unable to load earthquakes');
                    console.log(err);
                });
        },
        data() {
            return {
                feed: null,
                selected: null
            };
        },
        computed: {
            earthquakes() {
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
            }
        }
    }
</script>