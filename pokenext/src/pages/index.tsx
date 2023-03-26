import Card from "@/components/Card";
import { PokemonData } from "@/interfaces/PokemonData";
import styles from "@/styles/Home.module.scss";
import Image from "next/image";

export async function getStaticProps() {
	const maxPokemon = 251;
	const api = "https://pokeapi.co/api/v2/pokemon/";

	const res = await fetch(`${api}/?limit=${maxPokemon}`);
	const data = await res.json();

	data.results.forEach((item: PokemonData, index: number) => {
		item.id = index + 1;
	});

	return {
		props: {
			pokemons: data.results,
		},
	};
}

export default function Home({ pokemons }: { pokemons: PokemonData[] }) {
	return (
		<>
			<div className={styles.title_container}>
				<h1 className={styles.title}>
					Poke<span>Next</span>
				</h1>

				<Image
					src="/images/pokeball.png"
					width="50"
					height="50"
					alt="PokeNext"
				/>
			</div>

			<div className={styles.pokemon_container}>
				{pokemons.map((pokemon) => (
					<Card key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
		</>
	);
}
