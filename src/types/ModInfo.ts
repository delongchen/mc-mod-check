interface ModInfo {
  isFabricMod: boolean,
  fileName: string,
}

interface ModContact {
  homepage?: string,
  sources?: string
}

interface FabricModInfo extends ModInfo {
  id: string,
  version: string,
  name: string,
  description: string,
  authors: string[],
  contact?: ModContact
}

export {
  ModInfo,
  FabricModInfo
}
