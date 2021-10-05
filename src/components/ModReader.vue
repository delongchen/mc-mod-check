<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import fabricModsStore from '../store/fabricModsStore'
import { FabricModInfo } from '../types/ModInfo'

const { filesHandler, fabricMods, clean, otherMods, modInfos } = fabricModsStore.useStore()

const modsRef = ref<HTMLInputElement>()

onMounted(() => {
  modsRef.value?.addEventListener('change', () => {
    clean()
    filesHandler(modsRef.value?.files)
  })
})

function getHomepageUrl(mod: FabricModInfo) {
  return mod?.contact?.homepage ?? undefined
}
</script>

<template>
  <input type="file" multiple ref="modsRef"/>
  <a-button v-if="modInfos.length" @click="clean">清空</a-button>

  <a-collapse v-if="otherMods.length">
    <a-collapse-panel 
      :header="`存在${otherMods.length}个非fabric模组`"
      style="background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden"
    >
      <p v-for="(v, k) in otherMods" :key="v.fileName">
        {{ v.fileName }}
      </p>
    </a-collapse-panel>
  </a-collapse>

  <p>{{ modInfos.length ? '模组列表': '请选择jar文件' }}</p>

  <a-list item-layout="vertical" size="large" :data-source="fabricMods">
    <template #renderItem="{ item }">
      <a-list-item key="item.id">
        <a-list-item-meta
        >
          <template #title>
            <a :href="getHomepageUrl(item)">{{item.name}}</a>
          </template>
          <template #description>
            version: {{ item.version }}
          </template>
        </a-list-item-meta>
        {{ item.description }}
      </a-list-item>
    </template>
  </a-list>
</template>
