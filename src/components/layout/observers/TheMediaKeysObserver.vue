<template>
  <div
    id="the-media-keys-observer"
  />
</template>

<script>
import getQueueTrack from '@/helpers/actions/queue/track/get'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TheMediaKeysObserver',
  data () {
    return {
      mediaActionsHandlers: [
        {
          action: 'previoustrack',
          handler:
            this.handlePressPrevious
        },
        {
          action: 'nexttrack',
          handler:
            this.handlePressNext
        },
        {
          action: 'stop',
          handler:
            this.handlePressStop
        }
      ]
    }
  },
  computed: {
    queuePreviousTrackArgs () {
      return {
        direction: 'previous'
      }
    },
    queueNextTrackArgs () {
      return {
        direction: 'next'
      }
    }
  },
  mounted () {
    this.mediaActionsHandlers
      .forEach(
        this.setMediaActionHandler
      )
  },
  methods: {
    handlePressPrevious () {
      getQueueTrack(
        this.queuePreviousTrackArgs
      )
    },
    handlePressNext () {
      getQueueTrack(
        this.queueNextTrackArgs
      )
    },
    handlePressStop () {
      updateGlobalStore(
        {
          'player.playing': null
        }
      )
    },
    setMediaActionHandler (
      {
        action,
        handler
      }
    ) {
      navigator
        .mediaSession
        .setActionHandler(
          action,
          handler
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
