<template>
  <div id="the-background-observer" />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'TheBackgroundObserver',
  computed: {
    ...mapState(
      layoutStore,
      [
        'backgroundImages',
        'backgroundImageId'
      ]
    )
  },
  mounted () {
    window
      .mainProcess
      .addCommandHandler(
        'change-background-image',
        this.handleChangeBackgroundImage
      )

    window
      .mainProcess
      .addCommandHandler(
        'reset-background-image',
        this.handleResetBackgroundImage
      )

    window
      .mainProcess
      .addCommandHandler(
        'delete-background-image',
        this.handleDeleteBackgroundImage
      )
  },
  methods: {
    handleChangeBackgroundImage (
      _,
      {
        imageId,
        imagePath
      }
    ) {
      updateGlobalStore(
        {
          'layout.backgroundImageId': imageId,
          'layout.backgroundImagePath': imagePath
        }
      )
    },
    handleResetBackgroundImage () {
      this.resetBackgroundImage()
    },
    handleDeleteBackgroundImage (
      _,
      {
        imageId
      }
    ) {
      this.resetIfActive(
        imageId
      )

      this.deleteFromBackgroundImages(
        imageId
      )
    },
    resetBackgroundImage () {
      updateGlobalStore(
        {
          'layout.backgroundImageId': 0,
          'layout.backgroundImagePath': null
        }
      )
    },
    resetIfActive (
      imageId
    ) {
      const isActive = (
        imageId ===
          this.backgroundImageId
      )

      if (isActive) {
        this.resetBackgroundImage()
      }
    },
    deleteFromBackgroundImages (
      imageId
    ) {
      function isMatchedImage (
        imageData
      ) {
        return (
          imageData.id !== imageId
        )
      }

      const images = [
        ...this.backgroundImages.filter(
          isMatchedImage
        )
      ]

      updateGlobalStore(
        {
          'layout.backgroundImages': images
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
