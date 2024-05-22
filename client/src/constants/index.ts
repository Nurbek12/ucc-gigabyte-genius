import {
    BsQrCodeScan, 
    FlDesktopPulse,
    FlClipboardText,
    HeFilledDoctorMale,
} from '@kalimahapps/vue-icons'

export const navLinks = {
    ADMIN: [
        { title: 'Пользователи', icon: HeFilledDoctorMale, url: '/admin' },
        { title: 'Истории', icon: FlClipboardText, url: '/admin/histories' }
    ],
    DOCTOR: [
        { title: 'Рабочий стол', icon: FlDesktopPulse, url: '/doctor' },
        { title: 'Истории', icon: FlClipboardText, url: '/doctor/histories' }
    ],
    PATIENT: [
        { title: 'QR Код', icon: BsQrCodeScan, url: '/patient' }
    ]
}

export const userRoles = [
    { name: 'Админ', value: 'ADMIN' },
    { name: 'Доктор', value: 'DOCTOR' },
    { name: 'Патциент', value: 'PATIENT' },
]

export const doctorSpecs = [
    "Анестезиология",
  "Дерматология",
  "Скорая медицинская помощь",
  "Семейная медицина",
  "Внутренние болезни",
  "Неврология",
  "Акушерство и гинекология",
  "Офтальмология",
  "Патология",
  "Педиатрия",
  "Психиатрия",
  "Рентгенология",
  "Хирургия",
  "Аллергология и иммунология",
  "Кардиология",
  "Эндокринология",
  "Гастроэнтерология",
  "Гематология",
  "Инфекционные болезни",
  "Нефрология",
  "Онкология",
  "Пульмонология",
  "Ревматология",
  "Интенсивная терапия",
  "Гериатрия",
  "Хосписная и паллиативная помощь",
  "Лечение боли",
  "Физическая и реабилитационная медицина",
  "Сон",
].map(s => ({ name: s, value: s }))