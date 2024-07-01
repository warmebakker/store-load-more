<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Chip from 'primevue/chip';

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

const userIdTypeConverter = computed({
  get: (): number | undefined => props.filter?.userId as number ?? undefined,
  set: (value: number | undefined) => props.filter!.userId = value as number,
});
</script>

<template>
  <div class="flex flex-wrap justify-between p-1">
    <div class="flex flex-wrap gap-3 ">
      <div>
        <Button severity="secondary" label="Filter" icon="iconify mdi--filter" type="button" aria-label="Filter" @click="toggleVisible" />
        <Badge v-if="anyFilterActive" :value="activeFilters" class="-ml-4 -mt-2 absolute" />
      </div>
      <InputNumber v-if="show" v-model="userIdTypeConverter" mode="decimal" show-buttons :min="0" placeholder="userId #" />
    </div>
    <div>
      <Chip v-for="(value, key) in props.filter" :key="key" class="text-sm" :label="`filter: ${value}`" removable @remove="removeIndividualFilter(key)" />
    </div>
  </div>
</template>