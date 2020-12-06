import React from 'react'
import Info from './Info'
import Artists from './Artists'
import Albums from './Albums'
import Tracks from './Tracks'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import LoaderDimmer from 'global/LoaderDimmer'
import { Ref } from 'semantic-ui-react'
import 'styles/Tags.sass'

export default class Show extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.setNavSections(this.params().tagName)
    this.setTagName()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleTagChange(prevProps)
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  params = () => this.props.match.params

  handleTagChange (prevProps) {
    const { tagName } = this.params()

    const prevTagName = prevProps.match.params.tagName
    const isTagChanged = tagName !== prevTagName

    if (isTagChanged) {
      this.setNavSections(tagName)
      this.setState({ tagName: null, artistImages: null })
      this.setTagName()
    }
  }

  setNavSections (tagName) {
    const navSections = [
      { content: 'Tags' },
      { content: decodeURIComponent(tagName), active: true }
    ]

    this.props.setNavSections(navSections)
  }

  setTagName () {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
    }

    switchLoader(true)

    const url = `/lastfm/tags/${this.params().tagName}`
    const cancelToken = this.request.token
    const extra = { ...{ cancelToken } }

    const handleSuccess = resp => {
      const tagName = resp.data.tag.name

      this.setState({ ...{ tagName } })
      this.setNavSections(tagName)
    }

    const handleError = error => {
      !axios.isCancel(error) && this.setState({ ...{ error } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  tagData () {
    const { tagName, artistImages } = this.state

    const setArtistImages = images => {
      !artistImages && this.setState({ artistImages: images })
    }

    const artistsRef = React.createRef()
    const albumsRef = React.createRef()
    const tracksRef = React.createRef()

    const refs = { artistsRef, albumsRef, tracksRef }

    const segment = name => refs[`${name}Ref`]
    const segmentTop = name => segment(name).current.offsetTop - 60
    const scrollToTop = name => window.scrollTo(0, segmentTop(name))

    const infoProps = { tagName, artistImages }
    const artistsProps = { tagName, setArtistImages, scrollToTop }
    const albumsProps = { tagName, scrollToTop }
    const tracksProps = { tagName, scrollToTop }

    return (
      <div className="tagPage">
        <Info {...infoProps} />
        <Ref innerRef={artistsRef}>
          <Artists {...artistsProps} />
        </Ref>
        <Ref innerRef={albumsRef}>
          <Albums {...albumsProps} />
        </Ref>
        <Ref innerRef={tracksRef}>
          <Tracks {...tracksProps} />
        </Ref>
      </div>
    )
  }

  render () {
    const { tagName, error, isLoading } = this.state

    const tagData = tagName && this.tagData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const loaderData = isLoading && <LoaderDimmer />

    const contentData = tagData || errorData || loaderData

    return <React.Fragment>{contentData}</React.Fragment>
  }
}