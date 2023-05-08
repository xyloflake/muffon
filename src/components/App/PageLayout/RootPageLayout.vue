<template>
  <TheOnlineObserver
    v-if="profileId"
  />

  <TheLogoutObserver />

  <TheAccountDeleteObserver />

  <TheNativeThemeObserver />

  <TheBackgroundObserver />

  <TheAnonymousPlayingObserver
    v-if="isProfileAnonymous"
  />
  <ThePlayingObserver
    v-else-if="profileId"
  />

  <ThePlayingPublicObserver
    v-if="isRenderPlayingPublicObserver"
  />

  <TheScrobbleObserver
    v-if="isRenderScrobbleObserver"
  />

  <TheAnonymousBrowserObserver
    v-if="isProfileAnonymous"
  />
  <TheBrowserObserver
    v-else-if="profileId"
  />

  <TheDiscordObserver
    v-if="isPlayerWithDiscordRichPresence"
  />

  <TheExternalUrlsObserver />

  <TheBrowserTabsObserver
    v-if="isRenderBrowserTabsObserver"
  />

  <TheExitObserver />

  <TheRootBackground />

  <div class="ui container main-container main-view">
    <RouterView />
  </div>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import TheLogoutObserver
  from '@/components/layout/observers/TheLogoutObserver.vue'
import TheAccountDeleteObserver
  from '@/components/layout/observers/TheAccountDeleteObserver.vue'
import TheNativeThemeObserver
  from '@/components/layout/observers/TheNativeThemeObserver.vue'
import TheBackgroundObserver
  from '@/components/layout/observers/TheBackgroundObserver.vue'
import TheExternalUrlsObserver
  from '@/components/layout/observers/TheExternalUrlsObserver.vue'
import TheExitObserver
  from '@/components/layout/observers/TheExitObserver.vue'
import TheRootBackground from '@/components/layout/TheRootBackground.vue'

const TheOnlineObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheOnlineObserver.vue'
    )
  )
const TheAnonymousPlayingObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheAnonymousPlayingObserver.vue'
    )
  )
const ThePlayingObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/ThePlayingObserver.vue'
    )
  )
const ThePlayingPublicObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/ThePlayingPublicObserver.vue'
    )
  )
const TheScrobbleObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheScrobbleObserver.vue'
    )
  )
const TheAnonymousBrowserObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheAnonymousBrowserObserver.vue'
    )
  )
const TheBrowserObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheBrowserObserver.vue'
    )
  )
const TheDiscordObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheDiscordObserver.vue'
    )
  )
const TheBrowserTabsObserver =
  defineAsyncComponent(
    () => import(
      '@/components/layout/observers/TheBrowserTabsObserver.vue'
    )
  )

export default {
  name: 'RootPageLayout',
  components: {
    TheOnlineObserver,
    TheLogoutObserver,
    TheAccountDeleteObserver,
    TheNativeThemeObserver,
    TheBackgroundObserver,
    TheAnonymousPlayingObserver,
    ThePlayingObserver,
    ThePlayingPublicObserver,
    TheScrobbleObserver,
    TheAnonymousBrowserObserver,
    TheBrowserObserver,
    TheDiscordObserver,
    TheExternalUrlsObserver,
    TheBrowserTabsObserver,
    TheExitObserver,
    TheRootBackground
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing',
        isPlayerWithDiscordRichPresence:
          'isWithDiscordRichPresence',
        isPlayerWithScrobbling:
          'isWithScrobbling'
      }
    ),
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        isProfileAnonymous: 'isAnonymous',
        isShowProfilePlaying: 'isShowPlaying'
      }
    ),
    isRenderPlayingPublicObserver () {
      return (
        this.profileId &&
          this.playerPlaying &&
          this.isShowProfilePlaying
      )
    },
    isRenderBrowserTabsObserver () {
      return (
        this.isProfileAnonymous ||
          this.profileId
      )
    },
    isRenderScrobbleObserver () {
      return (
        this.profileId &&
          this.isPlayerWithScrobbling &&
          this.playerPlaying
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>