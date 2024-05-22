<template>
    <div class="w-full p-2">

        <app-table
            :items="items"
            :count="count"
            :headers="headers"
            :loading="loading"
            :custom-filters="customFilters"

            @fetching="getItems"
            >

            <template #table-top>
                <app-btn @click="dialog=true">Добавить</app-btn>
            </template>

            <template #table-item-firstName="{tableItem}">
                <span class="text-xs">{{ tableItem.firstName }} {{ tableItem.lastName }}</span>
            </template>

            <template #table-item-createdAt="{tableItem}">
                <span class="text-xs">{{ new Date(tableItem.createdAt).toLocaleString() }}</span>
            </template>

            <template #table-item-actions="{tableItem, index}">
                <div class="flex gap-1">
                    <app-btn @click="editItem(tableItem, index)" class="px-0">
                        Изменить
                    </app-btn>
                    <app-btn @click="deleteItem(tableItem.id, index)" class="px-0">
                        Удалить
                    </app-btn>
                </div>
            </template>
        </app-table>

        <app-dialog title="Форма пользователей" :open="dialog" @close-dialog="close">
            <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
                <app-input required v-model="item.firstName" placeholder="Имя" />
                <app-input required v-model="item.lastName" placeholder="Фамилия" />
                <app-input required v-model="item.phone" v-mask="'+000 00 000 00 00'" placeholder="Телефон" />
                <app-input required v-model="item.dateOfBirth" placeholder="Дата рождения" type="date" />
                <app-input :required="itemIndex===null" v-model="item.password" placeholder="Пароль" />
                <app-input v-model="item.email" placeholder="Email" />

                <app-select required v-model="item.role" :items="userRoles" />

                <template v-if="item.role === 'DOCTOR'">
                    <app-input v-model="item.roomNumber" type="number" placeholder="Номер комнаты" />
                    <app-select placeholder="Специализатция" required v-model="item.speciality" :items="doctorSpecs" />
                </template>
                <template v-else-if="item.role === 'PATIENT'">
                    <app-input v-model="item.address" type="text" placeholder="Адрес" />
                </template>

                <app-btn :disabled="createLoading" type="submit">
                    {{ createLoading?'Загружается':'Сохранить' }}
                </app-btn>
            </form>
        </app-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { IUser } from '@/types'
import AppBtn from '@/components/app-btn.vue'
import AppTable from '@/components/app-table.vue'
import AppInput from '@/components/app-input.vue'
import AppDialog from '@/components/app-dialog.vue'
import AppSelect from '@/components/app-select.vue'
import { userRoles, doctorSpecs } from '@/constants'
import { createUser, deleteUser, getUsers, updateUser } from '@/api/user.api'

const dialog = ref(false)
const loading = ref(false)
const count = ref<number>(0)
const items = ref<IUser[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Имя и фамилия", value: "firstName", sortable: true, balancedText: true, custom: true },
    { name: "Телефон", value: "phone", sortable: false, balancedText: true, custom: false },
    // { name: "", value: "category", sortable: false, balancedText: false, custom: false },
    // { name: "Price", value: "price", sortable: true, balancedText: false, custom: false },
    { name: "Роль", value: "role", sortable: false, balancedText: false, custom: false },
    { name: "Добавлен", value: "createdAt", sortable: false, balancedText: true, custom: true },
    { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const customFilters: any[] = [
    { name: 'role', items: [{ name: 'Все роли', value: undefined }, ...userRoles],nv: undefined },
    { name: 'speciality', items: [{ name: 'Все Специализатции', value: undefined },...doctorSpecs ], nv: undefined }
]

const item = reactive<IUser>({
    email: '',
    phone: '',
    address: '',
    lastName: '',
    firstName: '',
    roomNumber: 0,
    speciality: '',
    dateOfBirth: '',
    role: 'PATIENT',
})

const getItems = async (query: any) => {
    try {
        loading.value = true
        const { data } = await getUsers(query)
        items.value = data.result
        count.value = data.count        
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const editItem = (i: IUser, index: number) => {
    Object.assign(item, i)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await deleteUser(id)
    items.value.splice(index, 1)
}

const create = async (body: any) => {
    const { data } = await createUser(body)
    items.value.unshift(data.result)
}

const update = async (index: number, body: any) => {
    const { id, ...other } = body
    const { data } = await updateUser(id, other)
    Object.assign(items.value[index], data.result)
}

const save = async () => {
    try {
        createLoading.value = true
        if(itemIndex.value !== null) await update(itemIndex.value, item)
        else await create(item)
        close()
    } catch (error: any) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    Object.assign(item!, {
        email: '',
        phone: '',
        address: '',
        lastName: '',
        password: '',
        firstName: '',
        roomNumber: 0,
        speciality: '',
        dateOfBirth: '',
        role: 'PATIENT',
    })
    dialog.value = false
    itemIndex.value = null
}
</script>