
import { CharacterSheet } from './CharacterSheet'

interface Stat {
  id: string
  value: number|boolean|string
  min?: number
  max?: number
  derived?: boolean
}

interface CharacterSheetModel {
  name: string
  system: string
  meta?: { [key: string]: string }
  properties?: { [key: string]: string }
  stats?: { [key: string]: Stat }
}

export {
  Stat,
  CharacterSheetModel,
  CharacterSheet
}
