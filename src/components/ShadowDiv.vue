<template>
    <div
        style="position: absolute;"
        :style="'bottom: '+ bottom+'px; top: '+top+'px; width: '+width+'%; z-index: '+index+';'"
        :class="bgClass"
    >

    </div>
</template>

<script>
    export default {
        name: "ShadowDiv",
        data: () => ({

        }),
        props: ['bottom', 'top', 'width', 'index','bgClass']

    }
</script>

<style scoped>
    .asc {
        background: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.95),#FFF);
    }

    .desc {
        background: linear-gradient(#FFF, rgba(255,255,255,0.95),rgba(255,255,255,0));
    }

</style>