import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import styled from 'styled-components';

const StyledGeoMap = styled.div`
  #map${ ({id}) => `${id}` } {
    width: 300px;
    height: 300px;
    margin-left: 10px;
  }
`;

class GeoMap extends Component {
  state = {
    address: '',
    city: '',
    state: '',
    zip: 0,
    id: 0,
  };
	componentDidMount() {
    const token = localStorage.getItem("userToken");
    const headers = { headers: { Authorization: `${token}` } };
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/stylists/${this.props.id}`, headers)
      .then(res => {
        const stylist = res.data[0];
        const { address, city, state, zip, id } = stylist;
        const mapBoxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
        this.setState({ address, city, state, zip, id }, () => {
          const geoAddress = `${this.state.address} ${this.state.city} ${this.state.state} ${this.state.zip}`;
          axios
            .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ geoAddress }.json?access_token=${mapBoxAccessToken}`)
            .then(res => {
              const center = res.data.features[0].center;
              mapboxgl.accessToken = mapBoxAccessToken;
              const map = new mapboxgl.Map({
                container: `map${id}`,
                center,
                zoom: 13,
                style: 'mapbox://styles/mapbox/streets-v10',
                hash: true,
                });
              new mapboxgl.Marker()
                .setLngLat(center)
                .addTo(map);
            })
            .catch(err => console.log(err.response));
        });

      })
      .catch(err => console.log(err.response))
  };

  render() {
    const { id } = this.props;
    return(
      <StyledGeoMap id = { id }>
        <div id = {`map${id}`} />
      </StyledGeoMap>
    );
  }
}

export default GeoMap;
