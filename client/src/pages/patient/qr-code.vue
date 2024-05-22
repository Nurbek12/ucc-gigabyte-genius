<template>
    <div class="h-screen w-full flex justify-center items-center">
        <div class="max-w-[500px] min-w-[300px] w-full h-[400px] rounded overflow-hidden">
            <!-- <img src="" class="w-full h-full object-cover"> -->
            <!-- <canvas id="qrcode" width="300" height="300"></canvas> -->
            <!-- <vue-qrcode :text="store.user?.id" /> -->
            <QRCodeVue3
                :value="store.user!.id+''"
                :data="1"
                margin="20"
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
    </div>
</template>

<script setup lang="ts">
// import { onMounted } from 'vue'
import QRCodeVue3 from "qrcode-vue3"
import { useAppStore } from '@/store/appStore'

const store = useAppStore()

</script>