<template>
    <div class="h-screen w-full flex justify-center items-center">
        <div class="w-[400px] h-[400px] rounded overflow-hidden">
            <!-- <img src="" class="w-full h-full object-cover"> -->
            <!-- <canvas id="qrcode" width="300" height="300"></canvas> -->
            <!-- <vue-qrcode :text="store.user?.id" /> -->
            <QRCodeVue3
                :value="store.user!.id+''"
                :data="1"
                :margin="20"
                :qrOptions="{
                    typeNumber: 0,
                    mode: 'Byte',
                    errorCorrectionLevel: 'Q'
                }"
                :dotsOptions='{
                    "type": "square",
                    "color": "#000000",
                    "gradient": null
                }'
                :backgroundOptions='{"color": "#ffffff"}'
                
                :cornersSquareOptions='{
                    "type": "",
                    "color": "#000000",
                    "gradient": null
                }'
                 />
        </div>
        <!-- <span v-if="t">hello</span> -->
    </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import QRCodeVue3 from "qrcode-vue3"
import { listenHistory } from '@/api/socket'
import { useAppStore } from '@/store/appStore'
// import { useRouter } from 'vue-router'

// const t = ref(false)
// const router = useRouter()
const store = useAppStore()

listenHistory(() => {
    // t.value = true
    window.location.href = '/patient'
})
</script>