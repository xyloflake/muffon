import ElectronStore from 'electron-store'
import schema from './electronStore/schema'
import {
  electronStoreKey
} from '#/helpers/env'

const options = {
  accessPropertiesByDotNotation: false,
  encryptionKey: electronStoreKey,
  schema
}

const electronStore =
  new ElectronStore(
    options
  )

export default electronStore
