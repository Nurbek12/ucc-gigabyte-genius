<template>
    <qr-stream @decode="onDecode" class="mb">
        <div style="color: red;" class="frame"></div>
    </qr-stream>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import { QrStream } from 'vue3-qr-reader'

const emits = defineEmits(['onDecoded'])

function onDecode(data: any) {
    emits('onDecoded', data)
}
</script>