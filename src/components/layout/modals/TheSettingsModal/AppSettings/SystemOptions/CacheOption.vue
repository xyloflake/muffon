<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="cacheText"
      />

      <BaseToggle
        store-key="system.isWithCache"
        :is-checked="isWithCache"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import systemStore from '@/stores/system'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'CacheOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  mixins: [
    notificationMixin
  ],
  computed: {
    ...mapState(
      systemStore,
      [
        'isWithCache'
      ]
    ),
    cacheText () {
      return this.$t(
        'settings.options.app.system.cache.enable'
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.restartToApply'
      )
    }
  },
  watch: {
    isWithCache: 'handleIsWithCacheChange'
  },
  methods: {
    handleIsWithCacheChange () {
      this.notifySuccess()
    }
  }
}
</script>

<style lang="sass" scoped></style>
