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
                <p>Направлял: {{ r.fromDoctor?.firstName }} {{ r.doctor?.lastName }}: {{ r.fromDoctor?.speciality }} ({{ r.fromDoctor?.roomNumber }}-комната) <span :class="getOccupied(r.fromDoctorId!).color">{{ getOccupied(r.fromDoctorId!).text }}</span></p>
                <p>Кому: {{ r.doctor?.firstName }} {{ r.doctor?.lastName }}: {{ r.doctor?.speciality }} ({{ r.doctor?.roomNumber }}-комната) <span :class="getOccupied(r.doctorId!).color">{{ getOccupied(r.doctorId!).text }}</span></p>
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
import { useAppStore } from '@/store/appStore'

defineProps<{
    history: IHistory,
}>()

const appStore = useAppStore()
const getOccupied = (id: number): { text: string, color: string } => {
    const doctor = appStore.getDoctors.get(id)

    return doctor === undefined ? {
        text:'Оффлайн',
        color: 'text-gray-500'
    } : doctor ? {
        text: 'Занять',
        color: 'text-red-500'
    } : {
        text: 'Не занять',
        color: 'text-green-500'
    }
}
</script>