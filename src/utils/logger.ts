import { Charna } from ".."

export function logDebug(...args: unknown[]): void {
  if (Charna.debugMode) console.debug('🦊 Charna',args)
}