<template>
    <div class="container">
        <div class="image-container">
            <img :src="pokemon.image" :alt="pokemon.name" />
        </div>
        <div class="info-container">
            <div><span class="title">Name:</span> {{ pokemon.name }}</div>
            <div>
                <div><span class="title">Types:</span></div>
                <ul>
                    <li v-for="type in pokemon.types" class="type-value" :key="type.name">{{ type.name }}</li>
                </ul>
            </div>
        </div>
        <div class="stats-container">
            <div class="title">
                Stats
            </div>
            <div>
                <div class="stat-container">
                    <div>
                        <span class="stat-name">HP: </span> <span class="stat-value">{{ pokemon.stats.hp }}</span>
                    </div>
                    <div>
                        <span class="stat-name">SPD: </span>
                        <span class="stat-value">{{ pokemon.stats.speed }}</span>
                    </div>
                </div>
                <div class="stat-container">
                    <div>
                        <span class="stat-name">ATK: </span>
                        <span class="stat-value">{{ pokemon.stats.attack }}</span>
                    </div>
                    <div>
                        <span class="stat-name">SATK: </span>
                        <span class="stat-value">{{ pokemon.stats.special_attack }}</span>
                    </div>
                </div>
                <div class="stat-container">
                    <div>
                        <span class="stat-name">DEF: </span>
                        <span class="stat-value">{{ pokemon.stats.defense }}</span>
                    </div>
                    <div>
                        <span class="stat-name">SDEF: </span>
                        <span class="stat-value">{{ pokemon.stats.special_defense }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="locations-container">
            <div>
                <div><span class="title">Locations:</span></div>
                <div v-if="pokemon.location_area.length > 0">
                    <ul class="locations-list">
                        <li v-for="area in pokemon.location_area" class="type-value" :key="area.name">{{ area.name }}</li>
                    </ul>
                </div>
                <div v-else>Theres No Locations Available</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    pokemon: {
        type: Object,
        required: true,
    },
});
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.image-container {
    margin-bottom: 1rem;
    text-align: center;
}

.info-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.info-container>div {
    margin-bottom: 0.5rem;
}

.stats-container {
    text-align: center;
    margin-top: 1rem;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 0.5rem;
}

.title {
    font-weight: bold;
}

.stat-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
}

.stat-container div {
    margin: 0 10px;
}

.stat-name {
    font-weight: bold;
    font-size: 14px;
}

.stat-value {
    font-size: 12px;
}

.locations-container {
    text-align: center;
    margin-top: 1rem;
}

.locations-container>div {
    margin-bottom: 1rem;
}

.locations-container .title {
    font-weight: bold;
}

.locations-container ul {
    list-style-type: none;
    padding: 0;
    margin-top: 0.5rem;
}

.locations-container li {
    margin-bottom: 0.5rem;
}
</style>
