<template>
  <transition name="fade">
    <div v-if="open"  @click="$emit('close-dialog')" class="fixed p-4 flex items-center z-50 justify-center w-full h-full inset-0 bg-black/20 backdrop-blur-sm transition">
      <div :class="{'h-full': !!props.h_full}" class="bg-white flex flex-col gap-2 rounded border scrollbar-hide p-4 overflow-auto max-h-[95vh] w-full" :style="{maxWidth: (max_w||650)+'px'}" @click.stop>
        <div class="flex justify-between items-center">
          <h1 class="text-blue-600 text-xl">{{ props.title || 'App Dialog' }}</h1>
          <button @click="$emit('close-dialog')" aria-label="close" aria-labelledby="close-dialog">
            <GlClose class="w-6 h-6 text-red-500" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { GlClose } from '@kalimahapps/vue-icons'
const props = defineProps<{title: string, open: boolean, max_w?: number, h_full?: boolean}>()
const { open } = toRefs(props)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>