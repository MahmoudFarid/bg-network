import { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

export class GoogleMap extends Component {
  render() {
    const { height } = this.props

    return (
      <div>
        <Map
          google={this.props.google}
          zoom={8}
          initialCenter={{ lat: 27.60567, lng: 29.370744 }}
          className="map"
        />
        <Marker position={{ lat: 27.60567, lng: 29.370744 }} />

        <style jsx global>{`
          .map {
            height: ${height} !important;
            position: relative !important;
          }
        `}</style>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC68DytaDLSP-Z3I3poQ2q8Hp8CFS_c2I0',
})(GoogleMap)
