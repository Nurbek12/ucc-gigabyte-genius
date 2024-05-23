<template>
    <div class="w-full p-2">
        <app-table
            :items="items"
            :count="count"
            :headers="headers"
            :loading="loading"

            @fetching="getItems">

            <template #table-item-firstName="{tableItem}">
                <span class="text-xs">{{ tableItem?.patient?.firstName }} {{ tableItem?.patient?.lastName }}</span>
            </template>

            <template #table-item-phone="{tableItem}">
                <span class="text-xs">{{ tableItem?.patient?.phone }}</span>
            </template>

            <template #table-item-createdAt="{tableItem}">
                <span class="text-xs">{{ new Date(tableItem.createdAt).toLocaleString() }}</span>
            </template>

            <template #table-item-actions="{tableItem}">
                <app-btn class="px-0" @click="getHistory(tableItem.id)">
                    Смотреть детали
                </app-btn>
            </template>
        </app-table>

        <app-dialog title="Информатция о истории" :open="dialog" @close-dialog="close">
            <div class="mt-4 flex flex-col gap-4">
                <app-history-card v-if="dialog" :history="item" />
                <app-btn>Закрыть</app-btn>
            </div>
        </app-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { IHistory } from '@/types'
import AppBtn from '@/components/app-btn.vue'
import AppTable from '@/components/app-table.vue'
import AppDialog from '@/components/app-dialog.vue'
import { getAllHistories, getById } from '@/api/history.api'
import AppHistoryCard from '@/components/app-history-card.vue'

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const items = ref<IHistory[]>([])

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Имя и фамилия", value: "firstName", sortable: true, balancedText: true, custom: true },
    { name: "Телефон", value: "phone", sortable: false, balancedText: true, custom: true },
    { name: "Добавлен", value: "createdAt", sortable: true, balancedText: true, custom: true },
    { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const item = reactive<IHistory>({
    doctorId: 0,
    patientId: 0,
    status: 'NEW',
})

const getItems = async (query: any) => {
    try {
        loading.value = true
        const { data } = await getAllHistories(query)
        items.value = data.result
        count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const close = () => {
    Object.assign(item!, {
        doctorId: 0,
        patientId: 0,
        status: 'NEW',
    })
    dialog.value = false
}

const getHistory = async (id: any) => {
    const { data } = await getById(id)
    Object.assign(item, data.result)
    dialog.value = true
}
</script>