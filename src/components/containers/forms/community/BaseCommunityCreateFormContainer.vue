<template>
  <BaseFormContainer
    ref="form"
    :options="options"
    :is-loading="isLoading"
    :error="error"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '@/components/containers/forms/BaseFormContainer.vue'
import communityFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/community'
import createCommunity from '@/helpers/actions/api/community/create'
import {
  main as formatCommunityLink
} from '@/helpers/formatters/links/community'

export default {
  name: 'BaseCommunityCreateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    image: Object
  },
  emits: [
    'success'
  ],
  data () {
    return {
      communityId: null,
      error: null,
      isLoading: false,
      fields: [
        'title',
        'description'
      ]
    }
  },
  computed: {
    options () {
      return communityFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    },
    communityUrl () {
      return formatCommunityLink(
        {
          communityId: this.communityId
        }
      )
    }
  },
  watch: {
    communityId: 'handleCommunityIdChange'
  },
  methods: {
    createCommunity,
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const createArgs =
        this.formatCreateArgs(
          fields
        )

      this.createCommunity(
        createArgs
      )
    },
    handleCommunityIdChange () {
      this.redirect()

      this.$emit(
        'success'
      )
    },
    redirect () {
      this.$router.push(
        this.communityUrl
      )
    },
    formatCreateArgs (
      fields
    ) {
      const {
        title,
        description
      } = fields

      const image = this.image.data

      return {
        title,
        description,
        image
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
