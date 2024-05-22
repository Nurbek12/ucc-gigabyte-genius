<template>
    <div class="w-full border rounded overflow-hidden">
        <input @change="emits('changed', $event)" @input="emits('inputed', $event)" :min="props.min||'-999999999'" :max="props.max||'999999999'" v-model="model" :required="props.required" :readonly="props.readonly" :type="props.type||'text'" class="px-3 py-2 w-full text-sm outline-none" :placeholder="props.placeholder">
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineModel, defineEmits } from 'vue'

const model = defineModel()
const emits = defineEmits(['inputed', 'changed'])
const props = defineProps<{
    placeholder?: string,
    required?: boolean,
    type?: string,
    readonly?: boolean,
    min?: string,
    max?: string
}>()
</script>