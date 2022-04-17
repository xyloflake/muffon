import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'
import {
  handleError as handleFormError
} from '*/helpers/actions/form'

export default function (
  {
    title,
    description,
    image
  }
) {
  const url = '/communities'

  const profileId =
    store.state.profile.info.id

  const {
    token
  } = store.state.profile

  const params = {
    profile_id: profileId,
    token,
    title,
    description,
    image
  }

  const handleSuccess = (
    response
  ) => {
    this.communityId =
      response.data.community_id
  }

  const handleError = (
    error
  ) => {
    handleFormError.bind(
      this
    )(
      {
        error
      }
    )
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
