import React from 'react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import { Segment, Header } from 'semantic-ui-react'
import Paginated from 'global/Paginated'
import List from './albums/List'

export default class Albums extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  getData = page => {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
    }

    switchLoader(true)

    const tagNameEncoded = encodeURIComponent(this.props.tagName)
    const url = `/lastfm/tags/${tagNameEncoded}/albums`
    const params = { ...{ page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { tag } = resp.data

      const albums = tag.albums
      const responseTotalPages = tag.total_pages
      const responseCurrentPage = tag.page
      const error = null

      this.setState({
        ...{ albums, responseTotalPages, responseCurrentPage, error }
      })
    }

    const handleError = error => {
      const albums = null

      !axios.isCancel(error) && this.setState({ ...{ albums, error } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  albumsData () {
    const {
      albums,
      responseTotalPages,
      responseCurrentPage,
      isLoading
    } = this.state
    const { scrollToTop } = this.props
    const { getData } = this

    const clientPageLimit = 4
    const responsePageLimit = 20
    const collection = albums
    const collectionName = 'albums'
    const collectionList = <List />
    const itemsPerRow = 4

    const albumsDataProps = {
      responseTotalPages,
      responseCurrentPage,
      isLoading,
      scrollToTop,
      getData,
      clientPageLimit,
      responsePageLimit,
      collection,
      collectionName,
      collectionList,
      itemsPerRow
    }

    return <Paginated {...albumsDataProps} />
  }

  render () {
    const { albums, error, isLoading } = this.state

    const headerData = <Header as="h3" content="Top albums" />

    const albumsData = albums && this.albumsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = albumsData || errorData

    return (
      <Segment.Group className="tagsPageSegmentWrap">
        <Segment content={headerData} />
        <Segment
          className="tagsPageSegment"
          content={contentData}
          loading={isLoading}
        />
      </Segment.Group>
    )
  }
}