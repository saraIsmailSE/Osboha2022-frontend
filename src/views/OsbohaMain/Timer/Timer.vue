<template>
<count-down/>
</template>
<script>
import CountDown from '@/components/timer/Countdown.vue'
export default {
  components: { CountDown },
    name: 'Timer',
    data() {
        return {
            expand: true,
        }

    },

}
</script>
