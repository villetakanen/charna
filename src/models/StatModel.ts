export interface StatModel {
  type: string // "number", "string", "composite"
  initialValue?: number|string // The initial value of the stat
  formula?: string // The formula to calculate the value of a compound stat
}