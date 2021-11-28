
export interface Stat {
  id: string
  value: number|boolean|string
  min?: number
  max?: number
  derived?: boolean
}

export interface CharacterSheetModel {
  name: string
  system: string
  properties: { [key: string]: string }
  stats: { [key: string]: Stat }
}

export class CharacterSheet {
  id: string
  private _model: CharacterSheetModel|undefined

  constructor(id: string) {
    this.id = id
  }

  get (statName: string): Stat {
    return this._model ? {...this._model.stats[statName]} : {id: statName, value: 0}
  }
  set (statName: string, value: number|boolean|string) {
    if (this._model) this._model.stats[statName].value = value
  }


  set model(model: CharacterSheetModel) {
    this._model = model
  }
  get model(): CharacterSheetModel {
    return this._model || { name: '', system: '', properties: {}, stats: {} }
  }
}
