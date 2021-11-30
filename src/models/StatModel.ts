export interface StatModel {
  type: string // "number", "string", "composite"
  initialValue?: number|string // The initial value of the stat
}