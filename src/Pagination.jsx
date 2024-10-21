import { useEffect, useState } from "react"
import { getData } from "./Services"

const Pagination = () => {
    const [pokemon,setPokemon] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPage,setTotalPage] = useState(0)

    const apiData = `https://pokeapi.co/api/v2/pokemon?limit=72`

    useEffect(() => {
        const fetchData = async() => {
            const data = await getData(apiData)

            const pokemonResult = data.results.map(async(curPokemon) => {
                const res = await fetch(curPokemon.url)
                const data = await res.json()
                return data
            } )

            const showPokemon = await Promise.all(pokemonResult)
            setPokemon(showPokemon)
            setTotalPage(Math.ceil(showPokemon.length / 6))
        }

        fetchData()
    } )


    // Set Number Pages
    const setItemsPage = 6
    const startIndex = (currentPage - 1)* setItemsPage
    const endIndex = startIndex + setItemsPage
    const showSetItemsPage = pokemon.slice(startIndex,endIndex)

    // Set HandleNumber
    const handleNumber = (newPages) => {
        setCurrentPage(newPages)
    }

    // Set Next Prev Handler
    const nextHandler = () => {
        if(currentPage < totalPage){
             setCurrentPage(currentPage + 1)
        } 
    }

    const prevHandler = () => {
        if(currentPage > 1){
             setCurrentPage(currentPage - 1)
        } 
    }

    return(
        <main>
            <div className="grid grid_three">
                {
                    showSetItemsPage.map((curElme) => {
                        return(
                        <div className="card" key={curElme.id}>
                                <h3>{curElme.id}</h3>
                                <figure>
                                    <img src={curElme.sprites.other.dream_world.front_default} alt={curElme.name} />
                                </figure>
                                <h1>{curElme.name}</h1>
                        </div>
                        )
                    } )
                }
            </div>

                <div className="buttonNumber" >
                    <button className="button" onClick={prevHandler}>Prev</button>
                    <div className="hide_buttonNumber">
                        {
                            Array.from({length:totalPage},(_,i) => {
                                return(
                                    <button className="button" key={i} onClick={() => handleNumber(i + 1) } >{i + 1}</button>
                                )
                            } )
                        }
                    </div>
                    <button className="button" onClick={nextHandler}>Next</button>
                </div>
        </main>
    )
}

export default Pagination