<template>
    <div class="w-full p-2">
        <div v-if="history!==null" class="mt-4 flex flex-col gap-2 max-w-[500px] mx-auto rounded p-4 border">
            <h1 class="text-blue-500 text-xl font-medium">Информатция о истории</h1>
            <h1>Патциент: {{ history?.patient?.firstName }} {{ history?.patient?.lastName }}</h1>
            <h1>Телефон: {{ history?.patient?.phone }}</h1>
            <h1>Статус истории: <span class="lowercase">{{ history?.status }}</span></h1>

            <div v-if="history?.redirects?.length! > 0">
                <h2>Направлении</h2>
                <div class="p-2 rounded border mt-2" :class="{'bg-blue-500 text-white': i === history.redirects?.length!-1 }" v-for="r,i in history?.redirects||[]" :key="r.id">
                    <span>{{ i+1 }}. {{ r.title }}</span>
                    <p>{{ r.description }}</p>
                    <p>Направлял: {{ r.fromDoctor?.firstName }} {{ r.doctor?.lastName }}: {{ r.fromDoctor?.speciality }}</p>
                    <p>Кому: {{ r.doctor?.firstName }} {{ r.doctor?.lastName }}: {{ r.doctor?.speciality }} ({{ r.doctor?.roomNumber }}-комната)</p>
                    <p>Дата: {{ new Date(r.createdAt!).toLocaleString() }}</p>
                </div>
            </div>

            <div v-if="history?.diagnosis?.id"> 
                <h2>Диагностика</h2>
                <div class="p-2 rounded border bg-green-600 text-white">
                    <span>{{ history.diagnosis?.title || 'Title 1' }}</span>
                    <p>{{ history.diagnosis?.description || 'Description 1' }}</p>
                    <p>Дата: {{ new Date(history.diagnosis?.createdAt!).toLocaleString() }}</p>
                </div>
            </div>

            <div class="flex gap-2 items-center mt-2">
                <app-btn type="button" @click="dialog=true">Направлять</app-btn>
                <app-btn type="button" @click="dialog1=true">Диагностика</app-btn>
            </div>
            <app-btn @click="history=null">Закрыть</app-btn>
        </div>

        <div v-else class="flex justify-center py-10" v-if="!dialog">
            <div class="max-w-[500px] rounded overflow-hidden h-[400px]">
                <app-qrcode-reader @on-decoded="getHistory" />
            </div>
        </div>

        <app-dialog title="Форма наравление" :open="dialog" @close-dialog="close">
            <form @submit.prevent="handleRedirect" class="mt-4 flex flex-col gap-4">
                <app-input v-model="redirect.title" required placeholder="Называние наравление" />
                <app-textarea v-model="redirect.description" required placeholder="Описание наравление" />
                <app-select placeholder="Специализатция" required @changed="findDoctors" :items="doctorSpecs" />
                <div v-show="doctors.length > 0" class="p-2 bg-gray-200 rounded">
                    <div class="flex items-center gap-2" v-for="d in doctors" :key="d.id">
                        <input v-model="redirect.doctorId" class="mt-0.5" type="radio" :id="'doctor'+d.id" :value="d.id" name="doctor">
                        <label class="cursor-pointer" :for="'doctor'+d.id">{{ d.firstName }} {{ d.lastName }}</label>
                        <span>({{ d.roomNumber }}-комната)</span>
                    </div>
                </div>
                <input type="file" multiple hidden id="redirect-files">
                <app-btn :disabled="loading" type="button" @click="clickToFileInput">Добавить файлов</app-btn>
                <app-btn :disabled="loading" type="submit">
                    {{ loading?'Загружается':'Направлять' }}
                </app-btn>
            </form>
        </app-dialog>

        <app-dialog title="Форма Диагностики" :open="dialog1" @close-dialog="close1">
            <form @submit.prevent="handleDiagnosis" class="mt-4 flex flex-col gap-4">
                <app-input v-model="redirect.title" required placeholder="Называние Диагностики" />
                <app-textarea v-model="redirect.description" required placeholder="Описание Диагностики" />
     
                <app-btn :disabled="loading" type="submit">
                    {{ loading?'Загружается':'Сохранить' }}
                </app-btn>
            </form>
        </app-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { doctorSpecs } from '@/constants'
import { getUsers } from '@/api/user.api'
import AppBtn from '@/components/app-btn.vue'
import { useAppStore } from '@/store/appStore'
import { getByUserId } from '@/api/history.api'
import AppInput from '@/components/app-input.vue'
import AppDialog from '@/components/app-dialog.vue'
import AppSelect from '@/components/app-select.vue'
import { createRedirect } from '@/api/redirects.api'
import { createDiagnosis } from '@/api/diagnosis.api'
import AppTextarea from '@/components/app-textarea.vue'
import AppQrcodeReader from '@/components/app-qrcode-reader.vue'
import type { IHistory, IRedirect, IUser, IDiagnosis } from '@/types'

const dialog = ref(false)
const dialog1 = ref(false)
const loading = ref(false)
const appStore = useAppStore()
const doctors = ref<IUser[]>([])

const history = ref<IHistory|null>({} as any)
const redirect = reactive<IRedirect>({
    title: '',
    doctorId: null,
    historyId: null,
    description: '',
    fromDoctorId: appStore.getUser?.id!,
})

const diagnosis = reactive<IDiagnosis>({
    drug: [],
    title: '',
    description: '',
    historyId: null,
})

const close = () => {
    dialog.value = false
}

const close1 = () => {
    dialog1.value = false
}

const getHistory = async (id: any) => {
    const { data } = await getByUserId(id)
    history.value = data.result
}

getHistory(4)

const clickToFileInput = () => {
    document.getElementById('redirect-files')?.click()
}

const handleRedirect = async () => {
    redirect.historyId = history.value?.id!
    const { data } = await createRedirect(redirect)
    console.log(data.result)
    history.value?.redirects?.push(data.result)
    dialog.value = false
}

const handleDiagnosis = async () => {
    diagnosis.historyId = history.value?.id!
    const { data } = await createDiagnosis(diagnosis)
    history.value!.diagnosis = data.result
    history.value!.status = 'FINISH'
    dialog1.value = false
}

const findDoctors = async (spec: any) => {
    const { data } = await getUsers({ page: 1, limit: 1000, speciality: spec.target.value })
    doctors.value = data.result
}
</script>