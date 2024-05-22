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

            <template #table-item-createdAt="{tableItem}">
                <span class="text-xs">{{ new Date(tableItem.createdAt).toLocaleString() }}</span>
            </template>

            <template #table-item-actions="{tableItem}">
                <div class="flex gap-1">
                    <app-btn class="px-0" @click="editItem(tableItem)">
                        Смотреть детали
                    </app-btn>
                    <app-btn @click="dialog1=true" class="px-0">
                        Направление
                    </app-btn>
                    <app-btn class="px-0">
                        Диагностика
                    </app-btn>
                </div>
            </template>
        </app-table>

        <app-dialog title="Информатция о истории" :open="dialog" @close-dialog="close">
            <div class="mt-4 flex flex-col gap-4">
                <h1>Патциент: {{ item.patient?.firstName }} {{ item.patient?.lastName }}</h1>
                <h1>Телефон: {{ item.patient?.phone }}</h1>
                <h2>Направлении</h2>
                <div class="border rounded p-2">
                    <div v-for="r,i in item.redirects||[]" :key="r.id">
                        {{ i+1 }}. {{ r.review }}
                    </div>
                </div>

                <div class="flex gap-2 items-center">
                    <app-btn type="button" @click="dialog=false;dialog1=true">Направлять</app-btn>
                    <app-btn>Диагностика</app-btn>
                </div>
                <app-btn>Закрыть</app-btn>
            </div>
        </app-dialog>

        <app-dialog title="Форма наравление" :open="dialog1" @close-dialog="close1">
            <form @submit.prevent="handleRedirect" class="mt-4 flex flex-col gap-4">
                <app-textarea required placeholder="Описание наравление" />
                <input type="file" multiple hidden id="redirect-files">
                <!-- <div class="flex gap-2 items-center">
                    
                </div> -->
                <app-btn :disabled="createLoading1" type="button" @click="clickToFileInput">Добавить файлов</app-btn>
                <app-btn :disabled="createLoading1" type="submit">
                    {{ createLoading1?'Загружается':'Направлять' }}
                </app-btn>
            </form>
        </app-dialog>

        <div class="flex justify-center py-10" v-if="!dialog">
            <div class="max-w-[500px] rounded overflow-hidden">
                <app-qrcode-reader @on-decoded="getHistory" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { IHistory } from '@/types'
import AppBtn from '@/components/app-btn.vue'
import AppTable from '@/components/app-table.vue'
// import AppInput from '@/components/app-input.vue'
import AppDialog from '@/components/app-dialog.vue'
// import AppSelect from '@/components/app-select.vue'
import AppTextarea from '@/components/app-textarea.vue'
import AppQrcodeReader from '@/components/app-qrcode-reader.vue'
import { getAllHistories, 
    // createHistory, 
    getByUserId } from '@/api/history.api'

const dialog = ref(false)
const dialog1 = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const items = ref<IHistory[]>([])
const itemIndex = ref<number|null>(null)
// const createLoading = ref<boolean>(false)
const createLoading1 = ref<boolean>(false)

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Имя и фамилия", value: "firstName", sortable: true, balancedText: true, custom: true },
    { name: "Телефон", value: "phone", sortable: false, balancedText: true, custom: false },
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

// const create = async (body: any) => {
//     const { data } = await createHistory(body)
//     items.value.unshift(data.result)
// }

// const save = async () => {
//     try {
//         createLoading.value = true
//         await create(item)
//         close()
//     } catch (error: any) {
//         console.log(error)
//     } finally {
//         createLoading.value = false
//     }
// }

const editItem = (editedItem: IHistory) => {
    dialog.value = true
    Object.assign(item, editedItem)
}

const close = () => {
    Object.assign(item!, {
        doctorId: 0,
        patientId: 0,
        status: 'NEW',
    })
    dialog.value = false
    itemIndex.value = null
}

const close1 = () => {
    Object.assign(item!, {
        doctorId: 0,
        patientId: 0,
        status: 'NEW',
    })
    dialog1.value = false
    itemIndex.value = null
}

const getHistory = async (id: any) => {
    const { data } = await getByUserId(id)
    if(data.result.created)
        items.value.push(data.result)
    editItem(data.result)
}

const clickToFileInput = () => {
    document.getElementById('redirect-files')?.click()
}

const handleRedirect = () => {

}
</script>