<template>
    <div class="w-full p-2">
        <div class="mt-4 flex flex-col gap-2 max-w-[500px] mx-auto rounded p-4 border">
            <template v-if="history!==null">
                <h1 class="text-blue-500 text-xl">Информатция о истории</h1>
                <app-history-card :history="history" />
            </template>
            <p v-else class="text-center text-muted">Нет истории</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IDiagnosis, IHistory, IRedirect } from '@/types'
import { useAppStore } from '@/store/appStore'
import { getByUserId } from '@/api/history.api'
import AppHistoryCard from '@/components/app-history-card.vue'
import { listenHistory, listenDiagnosis, listenRedirect } from '@/api/socket'

const appStore = useAppStore()
const history = ref<IHistory|null>(null)

const init = async () => {
    const { data } = await getByUserId(appStore.getUser?.id!)
    history.value = data.result
}

listenHistory((createdHistory: IHistory) => {
    if(!history.value) return
    history.value = createdHistory
})

listenRedirect((createdRedirect: IRedirect) => {
    if(!history.value) return
    history.value.redirects!.push(createdRedirect)
})

listenDiagnosis((createdDiagnosis: IDiagnosis) => {
    if(!history.value) return
    history.value.diagnosis = createdDiagnosis
    history.value.status = 'FINISH'
})

init()
</script>