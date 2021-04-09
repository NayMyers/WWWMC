<template>
  <div>
    <div style="display:flex; justify-content: space-around; align-items: center; width: 100%">
      <label v-for="doggo in $options.dogNames" :key="doggo" style="margin-right: 2rem">
        <input type="radio" :value="doggo" v-model="selectedDog">
        {{doggo}}
      </label>
    </div>
    <img :src="dogImage" :alt="selectedDog">
  </div>
</template>

<script>
require.context('../assets/doggos', true, /\.jpg$/);

export default {
  data() {
    return {
      selectedDog: ""
    };
  },
  computed: {
    dogImage() {
      // Return nothing for the default empty string
      if (!this.selectedDog) {
        return;
      }

      const fileName = this.selectedDog.toLowerCase();

      // Request the image as a webpack module by using `require`
      return require(`../assets/doggos/subdir/${fileName}.jpg`);
    }
  },
  // A small trick to have non-reactive elements in the component.
  dogNames: ["Riley", "Annie", "Marvin"]
};
</script>
