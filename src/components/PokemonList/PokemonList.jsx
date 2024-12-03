import { useEffect, useState } from "react"
import axios from 'axios';
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const[pokemonList,setpokemonlist] = useState([]);
    const[isLoading , setIsloading] = useState(true);

    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";

    async function downloadsPokemon(){
        const response = await axios.get(POKEDEX_URL);//This downloads list of 20 pokemons

        const pokemonResults = response.data.results;// we get the array of pokemons from the reasults

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
    },[])  //Callback,DependencyArray:- Changes Track any Variable
    //After This Changes Componet rerendered when we Called use Effect

    return (
        <div className="pokemon-list-wrapper">
           <div>Pokemon List</div>
           {(isLoading) ? "Loading.....":
            pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
            }
        </div>
    )
}

export default PokemonList