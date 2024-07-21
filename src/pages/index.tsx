import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { getPokemons } from '../../lib/getsPokemons';
import Image from 'next/image'; // <1>
import pokemonTitle from '../images/pokemonTitle.png'; // <2>

export default function Home() {
  const [pokemons, setPokemons] = useState<Array<any>>([]);
  const [randomPokemon, setRandomPokemon] = useState<any>();
  const [showRandom, setShowRandom] = useState<boolean>(false);
  useEffect(() => {
    const fetchPokemons = async () => {
      console.log('Fetching pokemons...');
      const pokemonData = await getPokemons();
      console.log('Fetched pokemons:', pokemonData);
      setPokemons(pokemonData);

      const randomIndex = Math.floor(Math.random() * pokemonData.length);
      const randomPokemon = pokemonData[randomIndex];
      setRandomPokemon(randomPokemon);
    };

    fetchPokemons();
  }, []);
  const getRandomPokemon = () => {
    if (pokemons.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemons.length);
      const selectedPokemon = pokemons[randomIndex];
      setRandomPokemon(selectedPokemon);
      setShowRandom(true);
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image src={pokemonTitle} alt="Pokemon Title" /> {/* <3> */}
        <button onClick={getRandomPokemon} className={styles.randomButton}>
          Show Random Pokémon
        </button>
        {showRandom && randomPokemon && (
          <div className={styles.card}>
            <img src={randomPokemon.sprites.front_default} alt={randomPokemon.name} />
            <h3>{randomPokemon.name}</h3>
          </div>
        )}
        <div className={styles.grid}>
          {pokemons.map(pokemon => (
            <div key={pokemon.id} className={styles.card}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h2>{pokemon.name}</h2>
              <h3>Height: {pokemon.height}</h3>
              <h3>Weight:{pokemon.weight}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
