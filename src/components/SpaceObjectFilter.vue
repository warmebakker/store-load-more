<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Chip from 'primevue/chip';
import Calendar from 'primevue/calendar'

const props = defineProps<{
  filter: Record<string, number | boolean | string>
}>()

const emits = defineEmits(['filterChanged'])
const emitFilter = () => {
  updateActiveCount()
  emits('filterChanged', props.filter)
}

const show = ref<boolean>(false)
const activeFilters = ref<number>(0)

onMounted(() => updateActiveCount())
watchDebounced(props.filter, emitFilter, { debounce: 700, deep: true })

const toggleVisible = () => show.value = !show.value
const updateActiveCount = () => activeFilters.value = Object.entries(props.filter).filter(([key, value]) => value && key).length
const removeIndividualFilter = (key: string) => delete props.filter![key]

const anyFilterActive = computed(() => activeFilters.value > 0)

const idConverter = computed({
  get: (): number | undefined => props.filter?.id as number ?? undefined,
  set: (value: number | undefined) => value ? props.filter!.id = value as number : removeIndividualFilter('id')
});

const dateConverter = computed({
  get: (): Date | undefined => props.filter.date ? new Date(props.filter.date as string) : undefined,
  set: (value: Date | undefined) => value ? props.filter!.date = value.toDateString() : removeIndividualFilter('date')
});

const textConverter = computed({
  get: (): string | undefined => props.filter.text as string ?? undefined,
  set: (value: string | undefined) => value ? props.filter!.text = value as string : removeIndividualFilter('text')
});

</script>

<template>
  <div class="flex flex-wrap justify-between p-1 gap-4">
    <div class="flex flex-wrap gap-3 ">
      <div>
        <Button severity="secondary" label="Filter" icon="iconify mdi--filter" type="button" aria-label="Filter" @click="toggleVisible" />
        <Badge v-if="anyFilterActive" :value="activeFilters" class="-ml-4 -mt-2 absolute" />
      </div>
      <InputNumber v-if="show" v-model="idConverter" mode="decimal" show-buttons :min="0" placeholder="Id #" />
      <InputText v-if="show" v-model="textConverter" placeholder="Search" />
      <Calendar v-if="show" v-model="dateConverter" date-format="yy" placeholder="Year of launch" view="year" show-icon />
    </div>
    <div class="flex gap-2 h-fit">
      <Chip v-for="(value, key) in props.filter" :key="key" class="text-sm" :label="`filter: ${value}`" removable @remove="removeIndividualFilter(key)" />
    </div>
  </div>
</template>