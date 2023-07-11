<template>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Types</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="pokemon in pokemons" :key="pokemon.id" @click="checkDetails(pokemon)">
                <td>{{ pokemon.name }}</td>
                <td>
                    <img :src="pokemon.image" :alt="pokemon.name" />
                </td>
                <td>
                    <ul>
                        <li v-for="type in pokemon.types" :key="type">{{ type.name }}</li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
export default {
    name: 'PokemonTable',
    props: {
        pokemons: {
            type: Array,
            required: true,
        },
        checkDetails: {
            type: Function,
            required: true,
        },
    },
};
</script>