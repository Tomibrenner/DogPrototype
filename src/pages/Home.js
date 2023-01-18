import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(
    () => {
      const fetchDogData = async () => {
        try {
          const res = await fetch("https://api.thedogapi.com/v1/breeds"); //llamado a la api
          const data = await res.json(); //convierte a formato json
          setDogs(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      setSearched(false);
      fetchDogData();
    },
    [] /*eso es un array de dependencia */
  );
  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      );
      const data = await res.json();
      setDogs(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    searchForDog();
    setSearched(true);
  };
  //si no existe nada en dogs, Loading, si sí existe, que indique la cantidad
  return (
    <>
      {!dogs ? (
        <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <>
          <section className="p-8 max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="flex items-center justify-center  text-center px-5 text-3xl  font-bold lg:text-5xl text-white">
                The Dog App
              </h1>
              <p className="my-8 text-white">
                This application is powered by{" "}
                <a
                  href="https://thedogapi.com/"
                  className="text-indigo-600 underline active:text-orange-400"
                >
                  The Dog Api
                </a>
              </p>
              <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto "
                autoComplete="off"
              >
                <input
                  typeof="text"
                  name="search"
                  id="search"
                  placeholder="Search for a dog / breed"
                  className=" py-2 px-4 rounded shadow w-full bg-slate-400 text-white placeholder-white"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
            </div>
            <div className="grid grid-cols-2 grap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-200">
              {!searched ? (
                dogs.map((dog) => (
                  <Link
                    to={`/${dog.name}`}
                    key={dog.id}
                    className="bg-slate-700 p-4 rounded my-2 mx-2 hover:bg-slate-500 transition-all duration-200"
                  >
                    <article>
                      <img
                        src={dog.image.url}
                        alt={dog.name}
                        loading="lazy"
                        className="rounded md:h-72 w-full object-cover"
                      />
                      <h3 className="text-white text-lg font-bold mt-4">
                        {dog.name}
                      </h3>
                      <p className="text-slate-400">Bred for: {dog.bred_for}</p>
                    </article>
                  </Link>
                ))
              ) : (
                <>
                  {dogs.map((dog) => (
                    <Link
                      to={`/${dog.name}`}
                      key={dog.id}
                      className="bg-slate-700 p-4 rounded my-2 mx-2 hover:bg-slate-500 transition-all duration-200"
                    >
                      <article>
                        <img
                          className="rounded md:h-72 w-full object-cover"
                          src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                          alt={dog.name}
                        />
                        <h3 className="text-white text-lg font-bold mt-4">
                          {dog.name}
                        </h3>
                        <p className="text-slate-400">
                          Bred for: {dog.bred_for}
                        </p>
                      </article>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
