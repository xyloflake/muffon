import React from 'react'
import { Segment, Divider } from 'semantic-ui-react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import LoaderDimmer from 'global/LoaderDimmer'
import List from './similar/List'
import Pagination from 'global/Pagination'
import 'styles/artists/Similar.sass'

export default class Similar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false, currentPage: 1 }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().artistName)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleArtistChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  handleArtistChange (prevProps) {
    const { artistName } = this.params()

    const prevArtistName = prevProps.match.params.artistName
    const isArtistChanged = artistName !== prevArtistName

    if (isArtistChanged) {
      this.setNavSections(artistName)
      this.setState({ artists: null })
      this.getData()
    }
  }

  setNavSections (artistName) {
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `#/artists/${artistNameEncoded}`
    const navSections = [
      { content: 'Artists' },
      { content: decodeURIComponent(artistName), href: artistPageLink },
      { content: 'Similar', active: true }
    ]

    this.props.setNavSections(navSections)
  }

  getData = page => {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
    }

    switchLoader(true)

    const url = `/lastfm/artists/${this.params().artistName}/similar`
    const params = { ...{ page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { artist } = resp.data

      const artists = artist.similar
      const artistName = artist.name
      const totalPages = artist.total_pages
      const error = null

      this.setState({ ...{ artists, totalPages, error } })

      this.setNavSections(artistName)
    }

    const handleError = error => {
      const artists = null

      !axios.isCancel(error) && this.setState({ ...{ error, artists } })
    }

    const handleFinish = () => {
      window.scrollTo(0, 0)

      switchLoader(false)
    }

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  artistsData () {
    const { artists, isLoading, totalPages } = this.state

    const artistsDataProps = { artists }

    const handlePageChange = this.getData
    const paginationProps = { totalPages, isLoading, handlePageChange }

    return (
      <Segment className="pageSegment" loading={isLoading}>
        <List {...artistsDataProps} />

        <Divider />

        <Pagination {...paginationProps} />
      </Segment>
    )
  }

  render () {
    const { isLoading, artists, error } = this.state

    const artistsData = artists && this.artistsData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = isLoading && <LoaderDimmer />

    const contentData = artistsData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}