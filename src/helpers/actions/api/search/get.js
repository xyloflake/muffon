import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    sourceId = 'lastfm',
    scope = '',
    query,
    page,
    limit,
    isWithSelfData = false
  }
) {
  const url = `/${sourceId}/search/${scope}`

  const profileId =
    store.state.profile.info.id

  const params = {
    query,
    ...(isWithSelfData && {
      profile_id: profileId
    })
  }

  const handleSuccess = (
    response
  ) => {
    if (sourceId === 'youtube') {
      this.searchData = {
        page: 1,
        total_pages: 1,
        ...response.data.search
      }
    } else {
      this.searchData =
        response.data.search
    }
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
