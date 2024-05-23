<template>
    <div>
        <h1>#ID: {{ history.id }}</h1>
        <h1>Патциент: {{ history.patient?.firstName }} {{ history.patient?.lastName }}</h1>
        <h1>Телефон: {{ history.patient?.phone }}</h1>
        <h1>Статус истории: <span class="lowercase">{{ history?.status }}</span></h1>

        <div v-if="history?.redirects?.length! > 0">
            <h2>Направлении</h2>
            <div class="p-2 rounded border mt-2" :class="{'border-blue-500 bg-gray-50': i === history.redirects?.length!-1 }" v-for="r,i in history?.redirects||[]" :key="r.id">
                <span>{{ i+1 }}. {{ r.title }}</span>
                <p>{{ r.description }}</p>
                <p>Направлял: {{ r.fromDoctor?.firstName }} {{ r.doctor?.lastName }}: {{ r.fromDoctor?.speciality }} ({{ r.fromDoctor?.roomNumber }}-комната)</p>
                <p>Кому: {{ r.doctor?.firstName }} {{ r.doctor?.lastName }}: {{ r.doctor?.speciality }} ({{ r.doctor?.roomNumber }}-комната)</p>
                <p>Дата: {{ new Date(r.createdAt!).toLocaleString() }}</p>
            </div>
        </div>

        <div v-if="history?.diagnosis?.id"> 
            <h2>Диагностика</h2>
            <div class="p-2 rounded border bg-green-600 text-white">
                <span>{{ history.diagnosis?.title }}</span>
                <p>{{ history.diagnosis?.description }}</p>
                <p>Дата: {{ new Date(history.diagnosis?.createdAt!).toLocaleString() }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { IHistory } from '@/types'

defineProps<{
    history: IHistory,
}>()
</script>