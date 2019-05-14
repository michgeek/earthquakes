<template>
    <GmapMap
            :center="{lat:10, lng:10}"
            :zoom="3"
            map-type-id="terrain"
            style="width: 100vw; height: 100vh"
    >
    </GmapMap>
</template>
<script>
    export default {
        data() {
            return {};
        }
    }
</script>