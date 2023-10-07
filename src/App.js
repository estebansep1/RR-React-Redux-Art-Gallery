import './App.css';
import React, { useEffect } from 'react'; // Import useEffect
import { useSelector, useDispatch, connect } from 'react-redux';
import { fetchData, incrementId, decrementId, clearData } from './features/dataSlice';

function App() {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const renderImg = () => {
    if (data.apiData) {
      return <img style={{ width: '100vw' }} src={data.apiData.primaryImage} alt={data.apiData.title} />;
    } else {
      return <p>image here</p>;
    }
  };
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
      </div>
      <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  objectId: state.data.objectId
})

export default connect(mapStateToProps)(App)