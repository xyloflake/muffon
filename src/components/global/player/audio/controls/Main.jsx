import React from 'react'
import { Button } from 'semantic-ui-react'
import PlayerContext from 'contexts/PlayerContext'

export default class Main extends React.Component {
  static contextType = PlayerContext

  controlsData () {
    return (
      <React.Fragment>
        {this.shuffleButton()}

        <Button basic size="tiny" icon="backward" />

        {this.toggleAudioButton()}

        <Button basic size="tiny" icon="forward" />

        {this.repeatButton()}
      </React.Fragment>
    )
  }

  shuffleButton () {
    return (
      <Button
        basic={!this.context.shuffle}
        size="tiny"
        icon="shuffle"
        onClick={this.context.toggleShuffle}
      />
    )
  }

  toggleAudioButton () {
    return (
      <Button
        basic
        onClick={this.context.toggleAudio}
        icon={this.context.toggleAudioButtonIcon()}
      />
    )
  }

  repeatButton () {
    return (
      <Button
        basic={!this.context.repeat}
        size="tiny"
        icon="redo alternate"
        onClick={this.context.toggleRepeat}
      />
    )
  }

  render () {
    return this.controlsData()
  }
}
