const firebaseConfig = () => {
  // let config = {};
  // if (process.env.NODE_ENV === 'development') {
  //   config = {
  //     apiKey: '',
  //     authDomain: '',
  //     projectId: '',
  //     storageBucket: '',
  //     messagingSenderId: '',
  //     appId: '',
  //     measurementId: ''
  //   };
  // } else if (process.env.REACT_APP_MODE === 'production') {
  //   config = {
  //     apiKey: process.env.REACT_APP_API_KEY,
  //     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  //     projectId: process.env.REACT_APP_PROJECT_ID,
  //     storageBucket: process.env.REACT_APP_STORAGE_BUCK,
  //     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
  //     appId: process.env.REACT_APP_APP_ID,
  //     measurementId: process.env.REACT_APP_MEASUREMENT_ID
  //   };
  // }
  return {
    apiKey: 'AIzaSyCM4FM8Dp-S1dgbqvByGRNOOocpHMnfNjU',
    authDomain: 'splitwise3-e6c96.firebaseapp.com',
    projectId: 'splitwise3-e6c96',
    storageBucket: 'splitwise3-e6c96.appspot.com',
    messagingSenderId: '70532547335',
    appId: '1:70532547335:web:b5d29ebcf47ee4e9b2fba2',
    measurementId: 'G-H9ZZJ9Q33T'
  };
};

module.exports = { firebaseConfig };
