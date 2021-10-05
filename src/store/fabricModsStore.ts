import { ref, Ref } from 'vue'
import { JSZipObject, loadAsync } from 'jszip'

import createStore from '../utils/createStore'
import { ModInfo, FabricModInfo } from '../types/ModInfo'

type ModInfos = ModInfo[]
type ModInfosRef = Ref<ModInfos>

interface FabricModsStore {
  modInfos: ModInfosRef,
  fabricMods: Ref<FabricModInfo[]>,
  otherMods: ModInfosRef,
  filesHandler: (files: FileList | null | undefined) => void,
  clean: () => void
}

const FABRIC_MOD = 'fabric.mod.json'

const modInfos = ref<ModInfos>([])
const fabricMods = ref<FabricModInfo[]>([])
const otherMods = ref<ModInfos>([])

function filesHandler(files: FileList | null | undefined) {
  if (files && files.length) {
    for (let i = 0; i < files.length; i++) {
      handelOneFile(files[i])
    }
  }
}

async function handelOneFile(file: File) {
  const fileName = file.name
  if (fileName.endsWith('jar')) {
    const zip = await loadAsync(file)
    pushModAsync(zip.files[FABRIC_MOD], fileName)
  }
}

async function pushModAsync(file: JSZipObject | undefined, fileName: string) {
  const modInfo: ModInfo = {
    isFabricMod: true,
    fileName
  }

  if (file) {
    const s = await file.async('string')
    const info = <FabricModInfo>JSON.parse(s)
    Object.assign(info, modInfo)
    fabricMods.value.push(info)
  } else {
    modInfo.isFabricMod = false
    otherMods.value.push(modInfo)
  }

  modInfos.value.push(modInfo)
}

const fabricModsStore = createStore<FabricModsStore>({
  modInfos,
  fabricMods,
  otherMods,
  filesHandler,
  clean() {
    modInfos.value.length = 0
    fabricMods.value.length = 0
    otherMods.value.length = 0
  }
})

export default fabricModsStore
