import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import { cityInfoRequested } from '../../../Store/action/searchActions'

var map3Style = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]

const mapStyles = {
    width: '100%',
    height: '400px'
  };

const mapStyles2 = {
    width: '100%',
    height: '200px'
    };
  
const Map1 = (props) => {
    const [lat, setLat] = useState()
    const [long, setLong] = useState()

    useEffect(() => {
        console.log('props.lat: ', props.lat)
        console.log('props.long: ', props.long)
        setLat(props.lat)
        setLong(props.long)
        console.log('lat: ', lat)
        console.log('long: ', long)
    }, [props.lat, props.long])
    return (
        <Fragment>            
            {lat && long ? (
                <Map
                    google={props.google}
                    zoom={props.zoom}                    
                    styles={map3Style}
                    style={!props.styles ? mapStyles : mapStyles2}
                    initialCenter={{ lat: lat , lng: long }}
                >
                    <Marker position={{ lat: lat , lng: long}} icon= '../../assets/img/marker.png' />
                </Map>                
            ): null}
        </Fragment>
    )
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyChkvrpCamiks52u9Dn7EaWGJQn46HkFLs'
  })(Map1);