<template>
  <BaseTagPaginatedPageContainer
    :key="refreshKey"
    :tag-name="tagName"
    :scope="scope"
    :limit="limit"
    is-with-top-second-segment
    is-with-play-button
  >
    <template
      #topPlayButton
    >
      <BaseTagTracksPlayButton
        limit-name="medium"
        :tag-name="tagName"
      />
    </template>

    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        is-with-artist-name
        is-with-artist-image
        is-with-source-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-queue-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseTagPaginatedPageContainer>
</template>

<script>
import BaseTagPaginatedPageContainer
  from '@/components/containers/pages/tag/BaseTagPaginatedPageContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTagTracksPlayButton
  from '@/components/buttons/play/tag/BaseTagTracksPlayButton.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'TracksPage',
  components: {
    BaseTagPaginatedPageContainer,
    BaseTracksSimpleList,
    BaseTagTracksPlayButton
  },
  mixins: [
    pageMixin
  ],
  props: {
    tagName: String
  },
  data () {
    return {
      limit:
        tracksLimits.simple.large,
      scope: 'tracks'
    }
  }
}
</script>

<style lang="sass" scoped></style>
