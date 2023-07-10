import React from 'react';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { collection, getDoc, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { 
  EffectFade,
  Autoplay,
  Navigation,
  Pagination
} from "swiper";
import "swiper/css/bundle"
import { useNavigate } from 'react-router-dom';


export default function Slider() {;
  const [listings, setLisings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination])
  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function fetchListing() {
          const listingsRef = collection(db, "listings")
          const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5))
          const querrySnap = await getDoc(q)
          let lsitings = [];
          querrySnap.forEach((doc) => {
            return lsitings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setLisings(listings);
          console.log(listings);
      }
      fetchListing();
      setLoading(false);
      
    } catch (error) {
      toast.error("Could not load the page")
  }

  }, [listings])

  if(loading) {
    return <Spinner />
  }
  if (!listings) {
    return <></>;
  }
  return ( listings && (
     <>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar"}}
        effect='fade'
        modules={[EffectFade]}
        autoplay={{delay: 3000}}
      >
        {listings.map(({data, id}) => (
          <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
            <div style={{background: `url(${data.imgUrls[0]}) center no-repeat`, bacdkgroundSize: "cover"}}
            className='relative w-full h-[300px] overflow-hidden'
            >
            </div>
              <p className='text-[#f1faee] absolute, left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl'>{data.name}</p>
              <p className='text-[#f1faee] absolute, left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl'>
              ₦{data.discountedPrice ?? data.regularPrice} {data.type === "rent" && " / Year"}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
  );
}
