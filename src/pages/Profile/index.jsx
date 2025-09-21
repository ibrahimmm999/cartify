import { useEffect, useState } from "react";
import { getUser } from "../../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { logout } from "../../redux/slices/userSlice";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.data.sub);
  useEffect(() => {
    getUser(id, (status, res) => {
      if (status) {
        setUser(res);
        console.log(user);
      } else {
        toast.error(res);
      }
    });
  }, []);
  return (
    <>
      {user?.address?.geolocation?.lat && user?.address?.geolocation?.long && (
        <div className="w-9/10 mx-auto mt-12 flex justify-between">
          <div>
            <Toaster />
            <h1 className="font-bold text-2xl">Your Profile</h1>
            <div className="flex flex-col gap-4 my-8">
              <p>Username : {user?.username}</p>
              <p>First Name : {user?.name.firstname}</p>
              <p>Last Name : {user?.name.lastname}</p>
              <p>Email : {user?.email}</p>
              <p>Phone : {user?.phone}</p>
              <p>Address</p>
              <div className="ml-10 flex flex-col gap-4">
                <p>
                  Geo :{" "}
                  {`${user?.address.geolocation.lat}, ${user?.address.geolocation.long}`}
                </p>
                <p>Street : {user?.address.street}</p>
                <p>Number : {user?.address.number}</p>
                <p>City : {user?.address.city}</p>
                <p>Zipcode : {user?.address.zipcode}</p>
              </div>
            </div>
            <button
              onClick={() => {
                dispatch(logout());
                window.location.href = "/login";
              }}
              type="button"
              className="bg-red px-6 py-1.5 rounded text-white font-medium border border-black"
            >
              Logout
            </button>
          </div>
          <div className="h-120 w-1/2">
            <MapContainer
              center={[
                Number(user.address.geolocation.lat),
                Number(user.address.geolocation.long),
              ]}
              zoom={5}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  Number(user.address.geolocation.lat),
                  Number(user.address.geolocation.long),
                ]}
              >
                <Popup>{user.username} lives here 🚀</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
