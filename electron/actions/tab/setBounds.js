import getElectronStoreKey from '../electronStore/getKey.js'
import {
  isWindows,
  isMacos
} from '../../helpers/utils.js'

export default function (
  tab
) {
  const scale =
    getElectronStoreKey(
      'layout.scale'
    )

  const isFullScreen =
    mainWindow.isFullScreen()

  const topOffsetScaled =
    Math.round(
      tabsPanelHeight * scale
    )

  const topOffsetComputed = (
    isFullScreen ? 0 : topOffsetScaled
  )

  const extraTopOffset = (
    (isWindows || isMacos) ? 28 : 0
  )

  const [
    width,
    height
  ] = mainWindow.getSize()

  const heightScaled = (
    height -
      topOffsetComputed -
      extraTopOffset
  )

  const options = {
    x: 0,
    y: topOffsetComputed,
    width,
    height: heightScaled
  }

  tab.setBounds(
    options
  )
}
