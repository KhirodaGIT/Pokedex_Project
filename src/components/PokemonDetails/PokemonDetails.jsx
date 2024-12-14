import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import "./PokemonDetails.css"

function PokemonDetails(){
    const {id} = useParams();
    const [pokemon,setPokemon] = useState({});
    async function downloadPokemons () {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
       setPokemon({
        name:response.data.name,
        image :response.data.sprites.other.dream_world.front_default,
        weight:response.data.weight,
        height:response.data.height,
        types:response.data.types.map((t)=> t.type.name)
      })
    }


    useEffect(()=>{
        downloadPokemons();
    },[]);


    return (
        <div className="pokemon-details-wrapper">
            <img src={pokemon.image} alt="" className="pokemon-image" />
            <div className="pokemonName"> <span>{pokemon.name}</span></div>
            {/* <img src={pokemon.image} alt="" className="pokemon-image" /> */}
            <div className="pokemonName">Height:{pokemon.height}</div>
            <div className="pokemonName">Weight:{pokemon.weight}</div>
            <div className="pokemon-types">
                {pokemon.types && pokemon.types.map((t)=> <div key={t}> {t} </div>)}
            </div>
        </div>
    );
}

export default PokemonDetails;