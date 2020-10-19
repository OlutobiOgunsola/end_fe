import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalStyles from '@/assets/fonts.js';
import './App.css';

import Loading from '@/components/UI/Loading';

function App(props) {
  const data = {
    finance: {
      total: '12,918,291.47',
      disbursed: '1,281,274.19',
      history: [
        {
          id: 1,
          title: 'Water for lekki toll gate', 
          value: '29,182',
        },
        {
          id: 2,
          title: 'Benin packs of food', 
          value: '29,182',
        },
        {
          id: 3,
          title: 'Ambulance at Alausa', 
          value: '29,182',
        },
        {
          id: 4,
          title: 'Legal for Taiwo Oyebode', 
          value: '29,182',
        },
      ]
    },
    medical: {
      total: '1231',
      disbursed: '2,193,291.29'
    },
    legal: {
      total: '75',
      disbursed: '1,290,423.38'
    },
    news: [
      {
        id: 1,
        title: 'Lekki toll gate shooting',
        link: '#'
      },      {
        id: 2,
        title: 'Abuja thugs violent attack',
        link: '#'
      },      {
        id: 3,
        title: 'Remember their names',
        link: '#'
      }
    ]
  };

  const [appState, setAppState] = useState(data);
  const Home = React.lazy(() => import('./components/pages/home/Index.jsx'));
  const AddRequest = React.lazy(() => import('./components/pages/request/Add.jsx'));
  const AdminDashboard = React.lazy(() => import('./components/pages/admin/dashboard/Index.jsx'));
  const Auth = React.lazy(() => import('./components/pages/admin/auth/Index.jsx'));
  return (
    <div>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={<Loading />}>
            <Home state={appState}/>
          </Suspense>
        </Route>
        <Route path="/add_request">
          <Suspense fallback={<Loading />}>
            <AddRequest />
          </Suspense>
        </Route>
        <Route path="/endsars/admin_secure">
          <Suspense fallback={<Loading />}>
            <AdminDashboard />
          </Suspense>
        </Route>
        <Route path="/admin/auth">
          <Suspense fallback={<Loading />}>
            <Auth />
          </Suspense>
        </Route>
      </Switch>
    </div>
  );
}
export default App;
// export default connect(mapStateToProps)(App);
