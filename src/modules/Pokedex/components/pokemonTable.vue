<template>
    <div class="pokemon-table-container">
        <table class="pokemon-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Types</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pokemon, index) in pokemons" :key="pokemon.id" :class="index % 2 === 0 ? 'even' : 'odd'"
                    @click="checkDetails(pokemon)">
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
    </div>
</template>
  
<script setup>

const props = defineProps({
    pokemons: {
        type: Array,
        required: true,
    },
    checkDetails: {
        type: Function,
        required: true,
    },
});
</script>
  
<style lang="scss" scoped>
.pokemon-table-container {
    display: flex;
    justify-content: center;
    padding: 0 1rem;
}

.pokemon-table {
    width: 85%;
    border-collapse: collapse;

    th,
    td {
        padding: 0.5rem;
        text-align: center;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    tr.even {
        background-color: #f9f9f9;
    }

    tr.odd {
        background-color: #ffffff;
    }

    tr:hover {
        background-color: #e6e6e6;
        cursor: pointer;
    }

    img {
        max-width: 100px;
        max-height: 100px;
        display: block;
        margin: 0 auto;
    }

    ul {
        list-style-type: none;
    }
}
</style>