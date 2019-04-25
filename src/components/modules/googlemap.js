// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import GoogleMapReact from 'google-map-react'

// const GoogleReactComponent = ({ text }) => (
//     <div style={{
//       color: 'white', 
//       background: 'grey',
//       padding: '15px 10px',
//       display: 'inline-flex',
//       textAlign: 'center',
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderRadius: '100%',
//       transform: 'translate(-50%, -50%)'
//     }}>
//       {text}
//     </div>
//   );
//   class GoogleMap extends React.Component {
//     static defaultProps = {
//       center: {lat: 27.1767, lng: 78.0081},
//       zoom: 11
//     };
  
//     render() {
//       return (
//          <GoogleMapReact
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//          >
//          <GoogleReactComponent 
//             lat={59.955413} 
//             lng={30.337844} 
//             text={'Kreyser Avrora'} 
//          />
//         </GoogleMapReact>
//       );
//     }
//   }

//   export default GoogleMap;
  
//   //  ReactDOM.render(
//   //    <div style={{width: '100%', height: '400px'}}>
//   //      <Maps/>
//   //    </div>,
//   //   document.getElementById('main')
//   //  );
  