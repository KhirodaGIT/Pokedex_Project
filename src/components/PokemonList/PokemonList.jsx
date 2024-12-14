import { useEffect, useState } from "react"
import axios from 'axios';
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const[pokemonList,setpokemonlist] = useState([]);
    const[isLoading , setIsloading] = useState(true);

    const [pokedexurl,setPokedexurl] = useState("https://pokeapi.co/api/v2/pokemon");

    const[nextUrl,setNextUrl] = useState('');
    const[pervUrl,setPervUrl] = useState('');

    async function downloadsPokemon(){
        setIsloading(true)
        const response = await axios.get(pokedexurl);//This downloads list of 20 pokemons

        const pokemonResults = response.data.results;// we get the array of pokemons from the reasults
        console.log(response.data);
        setNextUrl(response.data.next);
        setPervUrl(response.data.previous)

        // iterating over the array of pokemons, and using their url, to create an array of promises
        //That will download those  20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) =>axios.get(pokemon.url))

        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
        console.log(pokemonData);

        // now iterate on the data of each pokemon and  extract id, name , image, types
        const pokelistReasults = (pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data
            return{ id : pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types:pokemon.types}
        }));
        console.log(pokelistReasults);
        setpokemonlist(pokelistReasults)
        setIsloading(false);
    }

    useEffect(()=>{
        downloadsPokemon();
    },[pokedexurl])  //Callback,DependencyArray:- Changes Track any Variable
    //After This Changes Componet rerendered when we Called use Effect

    return (
        <div className="pokemon-list-wrapper">
           <div>Pokemon List</div>
           <div className="pokemon-wrapper">
            {(isLoading) ? "Loading.....":
              pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
            }
           </div>
           <div className="controls">
            <button disabled={pervUrl == null} onClick={()=> setPokedexurl(pervUrl)}>Perv</button>
            <button disabled={nextUrl == null} onClick={()=> setPokedexurl(nextUrl)}>Next</button>
           </div>
        </div>
    )
}

export default PokemonList