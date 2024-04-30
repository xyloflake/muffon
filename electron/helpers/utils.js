import {
  app,
  dialog
} from 'electron'
import {
  existsSync,
  mkdirSync
} from 'fs'

export {
  v4 as generateKey
} from 'uuid'

const platforms = {
  windows: [
    'win32'
  ],
  macos: [
    'darwin'
  ],
  linux: [
    'linux',
    'freebsd',
    'openbsd'
  ]
}

export const colors = {
  white: '#ffffff',
  black: '#202122'
}

const harmfulSwitches = [
  'remote-debugging-port',
  'inspect',
  'inspect-brk',
  'inspect-brk-node',
  'inspect-port',
  'inspect-publish-uid',
  'js-flags',
  'proxy-server',
  'proxy-bypass-list',
  'host-rules'
]

function isHarmfulSwitchesPresent () {
  for (harmfulSwitch of harmfulSwitches) {
    if (
      app.commandLine.hasSwitch(
        harmfulSwitch
      )
    ) {
      return true
    }
  }
  return false
}

export const appName = 'Muffon'

export const handleHarmfulSwitches = () => {
  if (isHarmfulSwitchesPresent()) {
    dialog.showErrorBox(
      'Error',
      'Harmful switches detected'
    )

    // Do not call app.exit(), ask @xyloflake why
    process.exit()
  }
}

const {
  env,
  platform
} = process

export const isDevelopment = (
  env.NODE_ENV === 'development'
)

export const isShowDevTools = (
  env.DEV_TOOLS === 'true'
)

export const isMac =
  platforms
  .macos
  .includes(
    platform
  )

export const isLinux =
  platforms
  .linux
  .includes(
    platform
  )

export const isWindows =
  platforms
  .windows
  .includes(
    platform
  )

export const isSingleInstance =
  app.requestSingleInstanceLock()

export const deepLinksProtocol = `${appName}://`

export function createFolderIfNotExists (
  path
) {
  const isFolderExist =
    existsSync(
      path
    )

  if (!isFolderExist) {
    mkdirSync(
      path
    )
  }
}
