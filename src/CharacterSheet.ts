import { SheetModel} from './models/SheetModel'
import { StatModel } from './models/StatModel'

export class Stat implements StatModel{
  type: string
  private _value: number|string|undefined
  private _isComposite: boolean

  constructor(type:string, initilaValue?:number|string) {
    this.type = type
    this._isComposite = type === 'composite'
    if (typeof initilaValue !== 'undefined') {
      this.value = initilaValue
    } 
  }

  get value(): number|string {
    if (this._isComposite) return -1
    if (this.type === 'number') {
      if (this._value === undefined) return 0
      return this._value as number
    }
    return 0
  }

  set value(value:number|string) {
    if (this._isComposite) {
      throw new Error('Cannot set value on a composite stat')
    }
    if (this.type === 'number') {
      this._value = value as number
    }
    else if (this.type === 'string') {
      this._value = value as string
    }
  }

}

export class CharacterSheet {
  id: string
  private _model: SheetModel = { id: '', stats: {} }
  private _stats: Map<string, Stat> = new Map()
  
  constructor(id: string) {
    this.id = id
  }
  
  public getStat (statName: string): Stat|undefined{
    return this._stats.get(statName)
  }
  public setStat (statName: string, value: number|string): void {
    if (!this._stats.has(statName)) return
    const stat = this._stats.get(statName)
    if (stat) stat.value = value
  }
  
  set model(model: SheetModel) {
    this._model = model
    this.initializeStats()
  }
  get model(): SheetModel {
    return this._model || { name: '', system: '', properties: {}, stats: {} }
  }

  private initializeStats() {
    Object.keys(this._model.stats).forEach(statName => {
      if (this._stats.has(statName)) return
      const stat = new Stat(this._model.stats[statName].type, this._model.stats[statName].initialValue)
      this._stats.set(statName, stat)
    })
  }
}
