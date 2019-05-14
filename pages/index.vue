<template>
    <GmapMap :center="{lat:10, lng:10}" :zoom="2" map-type-id="terrain" style="width: 100vw; height: 100vh">
        <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position"/>
    </GmapMap>
</template>
<script>
    import feed from '../plugins/earthquakes.json';

    export default {
        data() {
            return {feed};
        },
        computed: {
            earthquakes() {
                return this.feed.hasOwnProperty('features') ? this.feed.features : [];
            },
            markers() {
                return this.earthquakes.map(({properties, geometry}) => {
                    return {
                        title: `${properties.title} - ${properties.time}`,
                        position: {
                            lat: geometry.coordinates[0],
                            lng: geometry.coordinates[1]
                        }
                    };
                });
            }
        }
    }
</script>