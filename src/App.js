import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Images from './components/ImageList';
function App() {
  const [imagesList, setimagesList] = useState([]);

  const APOD_URL = "https://api.nasa.gov/planetary/apod";
  const EPIC_URL = "https://api.nasa.gov/EPIC/api/natural/images"
  const MARS_ROVER_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000";
  const instance = axios.create({
    params: {
      api_key: "py1YldDHTuqofWPubMRKXeL1iDw01vrCZDjHTwRD"
    }
  });

  const getAPODImage = () => {
    return instance.get(APOD_URL, {
      params: {
        date: '2022-01-08'
      },
      transformResponse: [(data, headers) => {
        let {url, date, title, explanation: description} = JSON.parse(data);
        return [{url, date, title, description}]
      }]
    })
  }

  const getMarsImages = () => {
    return instance.get(MARS_ROVER_URL, {
      params: {
        page: 1
      },
      transformResponse: [(data, headers) => {
        let parsedData = JSON.parse(data);
        return parsedData.photos.map(photo => {
          const title = `${photo.camera.full_name} - ${photo.rover.name}`
          return { url: photo['img_src'], title,date: photo['earth_date']}
        });
      }]
    })
  }

  useEffect(() => {
    Promise.all([getAPODImage(), getMarsImages()])
      .then((results) => {
        const images = [...results[0].data, ...results[1].data]
        setimagesList(images)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header border-bottom display-6 fw-normal">
        Spacestagram
      </header>
      <div className='container py-5'>
        {
          <Images images={imagesList} />
        }
      </div>
    </div>
  );
}

export default App;
