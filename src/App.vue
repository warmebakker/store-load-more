<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'
import { ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import LightDarkSwitch from '@/components/LighDarkSwich.vue';
import BusToaster from '@/components/BusToaster.vue';

const items = ref<MenuItem[]>([
  {
    label: 'Home',
    icon: 'iconify mdi--home-circle',
    route: '/',
    key: 'home'
  },
  {
    label: 'About',
    icon: 'iconify mdi--information-slab-circle',
    route: '/about',
    key: 'about'
  }
]);
</script>

<template>
  <BusToaster />
  <header class="sticky top-0 z-50">
    <Menubar :model="items">
      <template #start>
        <img alt="Vue logo" class="mx-2 w-10" src="@/assets/logo.svg">
      </template>
      <template #item="{ item, props }">
        <router-link v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span class="text-xl" :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
      <template #end>
        <LightDarkSwitch class="mr-4 opacity-90" />
      </template>
    </Menubar>
  </header>
  <RouterView class="py-12 px-4 sm:px-10 xl:px-24" />
</template>
