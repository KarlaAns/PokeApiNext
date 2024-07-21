import styles from '../../styles/Home.module.css'; //<1>
import { useEffect, useState } from 'react'; //<2>
import { getPokemons } from '../../lib/getsPokemons'; //<3>

export default function Home() { //<4>
  const [pokemons, setPokemons] = useState<Array<any>>([]); //<5>

  useEffect(() => { //<6>
    const fetchPokemons = async () => { //<7>
      console.log('Fetching pokemons...'); //<8>
      const pokemonData = await getPokemons(); //<9>
      console.log('Fetched pokemons:', pokemonData); //<10>
      setPokemons(pokemonData); //<11>
    };

    fetchPokemons(); //<12>
  }, []); //<13>

  return (
    <div className={styles.container}> 
      <main className={styles.main}>
        <h1 className="text-green-400">Pokémons</h1>
        <div className={styles.grid}> 
          {pokemons.map(pokemon => ( //<18>
            <div key={pokemon.id} className={styles.card}> 
              <img src={pokemon.sprites.front_default} alt={pokemon.name} /> 
              <h3>{pokemon.name}</h3> 
            </div> //<22>
          ))}
        </div>
      </main>
    </div>
  );
}