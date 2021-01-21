<template>
    <div class="consulting-wrap">
        <img v-if="!isMobile" v-show="!isShow" :style="{zIndex: imgZIndex}" @click="show" class="consulting-img" src="https://static.ls.senguo.cc/static/official/img/advisory_p.png?v=ef9c2b8c21818f9f01d120f0273f5ac6" alt="">
        <img v-if="isMobile" width="90" class="consulting-img-mobile" v-show="!isShow" :style="{zIndex: imgZIndex}" @click="show" src="https://static.ls.senguo.cc/static/official/img/advisory_m.png?v=4eb81779457e3bc57dee64dac05b5c81" alt="">
        <PC @onClose="isShow=false" @onShow="isShow=true" v-if="!isMobile" v-show="isShow"></PC>
        <Mobile @onClose="isShow=false" @onShow="isShow=true" v-if="isMobile" v-show="isShow"></Mobile>
    </div>
</template>

<script>
import PC from './modules/pc/pc'
import Mobile from './modules/mobile/mobile'

let draging = false

export default {
    data() {
        return {
            isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
            isShow: false
        }
    },

    props: {
        imgZIndex: Number,
        autoShow: Boolean,
        autoShowDelayTime: Number
    },

    created() {
    },

    mounted() {
        if (this.autoShow) {
            setTimeout(() => {
                this.isShow = true
            }, this.autoShowDelayTime)
        }
    },

    methods: {
        show() {
            this.isShow = true
        }
    },

    components: {
        PC,
        Mobile
    }
}
</script>

<style lang="scss" scoped>
.consulting-img {
    position: fixed;
    right: 0;
    bottom: 0;
}

.consulting-img-mobile {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 90px !important;
}
</style>
